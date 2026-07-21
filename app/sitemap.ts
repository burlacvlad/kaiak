import type { MetadataRoute } from "next";
import { galleryImages } from "@/lib/gallery-images";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/seo";

const lastModified = new Date("2026-07-21T00:00:00+03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE_URL}${SOCIAL_IMAGE}`,
        `${SITE_URL}/images/hero-canoes.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/galerie`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: galleryImages.map((image) => `${SITE_URL}${image.src}`),
    },
    {
      url: `${SITE_URL}/termeni-si-conditii`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politica-de-confidentialitate`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
