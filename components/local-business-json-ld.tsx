import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/lib/seo";

const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: "Nistru Rent",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}${SOCIAL_IMAGE}`,
  description: SITE_DESCRIPTION,
  telephone: "+37378951423",
  priceRange: "100-1200 MDL",
  currenciesAccepted: "MDL",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pîrîta",
    addressCountry: "MD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.10392,
    longitude: 29.11893,
  },
  hasMap:
    "https://www.google.com/maps/dir/?api=1&destination=47.10392,29.11893",
  areaServed: {
    "@type": "Country",
    name: "Republica Moldova",
  },
  makesOffer: [
    {
      "@type": "Offer",
      price: "450",
      priceCurrency: "MDL",
      itemOffered: {
        "@type": "Service",
        name: "Arendă KAYAK dublu gonflabil",
        description: "KAYAK dublu gonflabil pentru 12 ore.",
      },
    },
    {
      "@type": "Offer",
      price: "250",
      priceCurrency: "MDL",
      itemOffered: {
        "@type": "Service",
        name: "Arendă cort dublu",
        description: "Cort dublu pentru 12 ore.",
      },
    },
    {
      "@type": "Offer",
      price: "100",
      priceCurrency: "MDL",
      itemOffered: {
        "@type": "Service",
        name: "Arendă sac de dormit",
        description: "Sac de dormit pentru 12 ore.",
      },
    },
  ],
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessData).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
