import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { injectSchema } from "@/lib/schema";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Inject BreadcrumbList schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        ...items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": item.label,
          "item": item.href ? window.location.origin + item.href : undefined
        }))
      ]
    };
    
    const cleanup = injectSchema(schema);
    return cleanup;
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="bg-cream/30 border-b border-primary/10">
      <div className="container py-4">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          <li>
            <Link href="/" className="flex items-center gap-1 text-primary/70 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary/40" />
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="text-primary/70 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
