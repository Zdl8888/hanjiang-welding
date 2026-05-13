export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HanJang Welding",
    alternateName: "悍将焊机",
    url: "https://hanjiang-welding.vercel.app",
    logo: "https://hanjiang-welding.vercel.app/logo.png",
    description:
      "Professional welding machine manufacturer — TIG, MIG/MAG, MMA, Plasma Cutting. CE & ISO certified. Exported to 30+ countries.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Chinese", "English"],
    },
    sameAs: [],
  };
  return <JsonLd data={data} />;
}

export function ProductLd({
  name,
  description,
  image,
  price,
  sku,
  brand,
}: {
  name: string;
  description: string;
  image: string;
  price?: number;
  sku: string;
  brand?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `https://hanjiang-welding.vercel.app${image}`,
    sku,
    brand: {
      "@type": "Brand",
      name: brand || "HanJang Welding",
    },
    manufacturer: {
      "@type": "Organization",
      name: "HanJang Welding",
    },
  };
  if (price) {
    data.offers = {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://hanjiang-welding.vercel.app/products/${sku}`,
    };
  }
  return <JsonLd data={data} />;
}

export function BreadcrumbLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://hanjiang-welding.vercel.app${item.href}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function WebSiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HanJang Welding",
    alternateName: "悍将焊机",
    url: "https://hanjiang-welding.vercel.app",
    inLanguage: ["zh-CN", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://hanjiang-welding.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} />;
}
