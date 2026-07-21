"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type PrivacyAwareNavigator = Navigator & {
  globalPrivacyControl?: boolean;
};

function getCampaignValue(searchParams: URLSearchParams, key: string) {
  return searchParams.get(key)?.slice(0, 120) ?? null;
}

export function WebsiteAnalytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) {
      return;
    }

    lastTrackedPath.current = pathname;

    const privacyNavigator = navigator as PrivacyAwareNavigator;

    if (
      navigator.doNotTrack === "1" ||
      privacyNavigator.globalPrivacyControl === true
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const payload = JSON.stringify({
        path: pathname,
        pageTitle: document.title,
        referrer: document.referrer || null,
        language: navigator.language || null,
        clientTimezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        utmSource: getCampaignValue(searchParams, "utm_source"),
        utmMedium: getCampaignValue(searchParams, "utm_medium"),
        utmCampaign: getCampaignValue(searchParams, "utm_campaign"),
      });

      if (navigator.sendBeacon) {
        const accepted = navigator.sendBeacon(
          "/api/analytics",
          new Blob([payload], { type: "application/json" })
        );

        if (accepted) {
          return;
        }
      }

      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
