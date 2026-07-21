import type { Metadata } from "next";

export const SITE_NAME = "KAYAK Nistru";
export const SITE_URL = "https://nistrurent.com";
export const SITE_TITLE =
  "Închiriere caiace gonflabile în Pîrîta | KAYAK Nistru";
export const SITE_DESCRIPTION =
  "Închiriază caiace duble gonflabile, corturi și saci de dormit în satul Pîrîta, pe malul Nistrului. Arendă simplă, fără excursii organizate.";
export const SOCIAL_IMAGE = "/images/kayak-nistru-social.jpg";
export const SOCIAL_IMAGE_ALT =
  "Clienți KAYAK Nistru alături de caiacele gonflabile pe malul Nistrului";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "ro-MD": path,
      },
    },
    openGraph: {
      type: "website",
      locale: "ro_MD",
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
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
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}
