import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld";
import { WebsiteAnalytics } from "@/components/website-analytics";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "închiriere caiac Moldova",
    "arendă caiac Nistru",
    "kayak Moldova",
    "caiace gonflabile",
    "caiac Pîrîta",
    "echipament camping Moldova",
    "corturi de închiriat",
    "Nistru Rent",
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "sport și agrement",
  alternates: {
    canonical: "/",
    languages: {
      "ro-MD": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro-MD"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        {children}
        <WebsiteAnalytics />
      </body>
    </html>
  );
}
