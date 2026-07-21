import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AnalyticsBody = {
  path?: unknown;
  pageTitle?: unknown;
  referrer?: unknown;
  language?: unknown;
  clientTimezone?: unknown;
  screenWidth?: unknown;
  screenHeight?: unknown;
  viewportWidth?: unknown;
  viewportHeight?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
};

type DeviceInfo = {
  browser: string;
  browserVersion: string | null;
  os: string;
  deviceType: "desktop" | "mobile" | "tablet" | "bot" | "unknown";
  deviceModel: string | null;
  isBot: boolean;
};

function limitedText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

function safeInteger(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const integer = Math.round(value);
  return integer >= 0 && integer <= 20_000 ? integer : null;
}

function decodeHeader(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return decodeURIComponent(value).slice(0, 120);
  } catch {
    return value.slice(0, 120);
  }
}

function getReferrerHost(value: unknown) {
  const referrer = limitedText(value, 1_000);

  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer).hostname.slice(0, 255) || null;
  } catch {
    return null;
  }
}

function getClientIp(request: Request) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function getMoldovaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Chisinau",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function parseDevice(request: Request): DeviceInfo {
  const userAgent = request.headers.get("user-agent") ?? "";
  const mobileHint = request.headers.get("sec-ch-ua-mobile") === "?1";
  const platformHint = request.headers
    .get("sec-ch-ua-platform")
    ?.replaceAll('"', "")
    .trim();
  const isBot =
    /bot|crawler|spider|crawling|headless|preview|facebookexternalhit|slurp/i.test(
      userAgent
    );

  let browser = "Necunoscut";
  let browserVersion: string | null = null;
  const browserMatchers: Array<[RegExp, string]> = [
    [/EdgA?\/([\d.]+)/, "Microsoft Edge"],
    [/OPR\/([\d.]+)/, "Opera"],
    [/SamsungBrowser\/([\d.]+)/, "Samsung Internet"],
    [/(?:CriOS|Chrome)\/([\d.]+)/, "Chrome"],
    [/(?:FxiOS|Firefox)\/([\d.]+)/, "Firefox"],
    [/Version\/([\d.]+).*Safari\//, "Safari"],
  ];

  for (const [pattern, name] of browserMatchers) {
    const match = userAgent.match(pattern);

    if (match) {
      browser = name;
      browserVersion = match[1] ?? null;
      break;
    }
  }

  let os = platformHint || "Necunoscut";
  const windowsVersion = userAgent.match(/Windows NT ([\d.]+)/)?.[1];
  const androidVersion = userAgent.match(/Android ([\d.]+)/)?.[1];
  const iosVersion = userAgent.match(/(?:iPhone OS|CPU OS) ([\d_]+)/)?.[1];
  const macVersion = userAgent.match(/Mac OS X ([\d_]+)/)?.[1];

  if (windowsVersion) {
    os =
      windowsVersion === "10.0"
        ? "Windows 10/11"
        : `Windows ${windowsVersion}`;
  } else if (androidVersion) {
    os = `Android ${androidVersion}`;
  } else if (iosVersion) {
    os = `iOS ${iosVersion.replaceAll("_", ".")}`;
  } else if (macVersion && !/iPhone|iPad|iPod/.test(userAgent)) {
    os = `macOS ${macVersion.replaceAll("_", ".")}`;
  } else if (/CrOS/.test(userAgent)) {
    os = "ChromeOS";
  } else if (/Linux/.test(userAgent) && !/Android/.test(userAgent)) {
    os = "Linux";
  }

  let deviceType: DeviceInfo["deviceType"] = "unknown";

  if (isBot) {
    deviceType = "bot";
  } else if (/iPad|Tablet|PlayBook|Silk/i.test(userAgent)) {
    deviceType = "tablet";
  } else if (mobileHint || /Mobile|iPhone|iPod|Android/i.test(userAgent)) {
    deviceType = "mobile";
  } else if (userAgent) {
    deviceType = "desktop";
  }

  let deviceModel: string | null = null;

  if (/iPad/.test(userAgent)) {
    deviceModel = "iPad";
  } else if (/iPhone/.test(userAgent)) {
    deviceModel = "iPhone";
  } else {
    const androidModel = userAgent.match(
      /Android[^;)]*;\s*([^;)]+?)(?:\s+Build\/[^;)]+)?[;)]/
    )?.[1];
    deviceModel = androidModel?.replace(/^wv$/i, "").trim().slice(0, 120) || null;
  }

  return {
    browser,
    browserVersion,
    os,
    deviceType,
    deviceModel,
    isBot,
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Payload prea mare." }, { status: 413 });
  }

  let body: AnalyticsBody;

  try {
    body = (await request.json()) as AnalyticsBody;
  } catch {
    return NextResponse.json({ error: "Date invalide." }, { status: 400 });
  }

  const path = limitedText(body.path, 500);

  if (!path?.startsWith("/")) {
    return NextResponse.json({ error: "Pagina nu este validă." }, { status: 400 });
  }

  const restUrl =
    process.env.SUPABASE_REST_URL ??
    (process.env.SUPABASE_URL
      ? `${process.env.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1`
      : null);
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!restUrl || !secretKey) {
    console.error("Website analytics: configurarea Supabase lipsește");
    return NextResponse.json(
      { error: "Analytics indisponibil temporar." },
      { status: 503 }
    );
  }

  const device = parseDevice(request);
  const dateKey = getMoldovaDateKey();
  const visitorHash = createHmac(
    "sha256",
    process.env.ANALYTICS_HASH_SALT ?? secretKey
  )
    .update(
      `${dateKey}|${getClientIp(request)}|${request.headers.get("user-agent") ?? ""}`
    )
    .digest("hex");
  const host = limitedText(
    request.headers.get("x-forwarded-host") ?? request.headers.get("host"),
    255
  );
  const payload = {
    visitor_hash: visitorHash,
    path,
    page_title: limitedText(body.pageTitle, 200),
    referrer_host: getReferrerHost(body.referrer),
    site_host: host,
    country_code: limitedText(request.headers.get("x-vercel-ip-country"), 2),
    region: decodeHeader(request.headers.get("x-vercel-ip-country-region")),
    city: decodeHeader(request.headers.get("x-vercel-ip-city")),
    geo_timezone: decodeHeader(request.headers.get("x-vercel-ip-timezone")),
    client_timezone: limitedText(body.clientTimezone, 100),
    language: limitedText(body.language, 35),
    browser: device.browser,
    browser_version: device.browserVersion,
    os: device.os,
    device_type: device.deviceType,
    device_model: device.deviceModel,
    screen_width: safeInteger(body.screenWidth),
    screen_height: safeInteger(body.screenHeight),
    viewport_width: safeInteger(body.viewportWidth),
    viewport_height: safeInteger(body.viewportHeight),
    utm_source: limitedText(body.utmSource, 120),
    utm_medium: limitedText(body.utmMedium, 120),
    utm_campaign: limitedText(body.utmCampaign, 120),
    is_bot: device.isBot,
    environment: limitedText(
      process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
      30
    ),
  };

  try {
    const response = await fetch(
      `${restUrl.replace(/\/+$/, "")}/website_page_views`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(6_000),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      console.error("Website analytics: inserarea Supabase a eșuat", {
        status: response.status,
        details,
      });
      return NextResponse.json(
        { error: "Analytics indisponibil temporar." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Website analytics: conexiunea Supabase a eșuat", error);
    return NextResponse.json(
      { error: "Analytics indisponibil temporar." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
