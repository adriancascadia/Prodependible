// Schema.org structured data utilities for SEO

export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  image: string[];
  "@id": string;
  url: string;
  telephone: string;
  email: string;
  priceRange: string;
  foundingDate?: string;
  address: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
  areaServed: Array<{
    "@type": "City" | "State";
    name: string;
  }>;
}

export const getLocalBusinessSchema = (): LocalBusinessSchema => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dependable Home Improvement",
  image: [
    window.location.origin + "/logo-premium.png",
    window.location.origin + "/hero-background.jpg"
  ],
  "@id": window.location.origin,
  url: window.location.origin,
  telephone: "+12016374343",
  email: "prodendable@gmail.com",
  priceRange: "$$",
  foundingDate: "2017-08",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bergen County",
    addressRegion: "NJ",
    addressCountry: "US"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.9265,
    longitude: -74.0779
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00"
    }
  ],
  sameAs: [
    "https://www.facebook.com/prodependable",
    "https://www.instagram.com/prodependable",
    "https://www.linkedin.com/company/dependable-home-improvement"
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "100"
  },
  areaServed: [
    { "@type": "City", name: "Bergen County" },
    { "@type": "City", name: "Passaic County" },
    { "@type": "City", name: "Hudson County" },
    { "@type": "City", name: "Essex County" },
    { "@type": "City", name: "Morris County" },
    { "@type": "State", name: "New Jersey" }
  ]
});

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  serviceType: string;
  provider: {
    "@type": "LocalBusiness";
    name: string;
  };
  areaServed: {
    "@type": "State";
    name: string;
  };
  description: string;
}

export const getServiceSchemas = (): ServiceSchema[] => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Handyman Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Dependable Home Improvement"
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey"
    },
    description: "Professional handyman services including fixture installation, repairs, drywall work, and general maintenance."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Carpentry Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Dependable Home Improvement"
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey"
    },
    description: "Expert carpentry and woodwork including custom cabinetry, deck construction, trim installation, and furniture restoration."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Painting Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Dependable Home Improvement"
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey"
    },
    description: "Professional interior and exterior painting services including cabinet refinishing, deck staining, and color consultation."
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Home Renovation",
    provider: {
      "@type": "LocalBusiness",
      name: "Dependable Home Improvement"
    },
    areaServed: {
      "@type": "State",
      name: "New Jersey"
    },
    description: "Complete home renovation services including kitchen remodeling, bathroom renovations, basement finishing, and room additions."
  }
];

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export const getFAQPageSchema = (faqs: Array<{ question: string; answer: string }>): FAQPageSchema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export interface BlogPostingSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  image: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  description: string;
}

export const getBlogPostingSchema = (post: {
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
}): BlogPostingSchema => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  image: window.location.origin + post.image,
  author: {
    "@type": "Organization",
    name: post.author
  },
  publisher: {
    "@type": "Organization",
    name: "Dependable Home Improvement",
    logo: {
      "@type": "ImageObject",
      url: window.location.origin + "/logo-premium.png"
    }
  },
  datePublished: post.date,
  dateModified: post.date,
  description: post.excerpt
});

// Helper to inject schema into page
export const injectSchema = (schema: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
  return () => {
    document.head.removeChild(script);
  };
};
