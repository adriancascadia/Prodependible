import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, FileText, MapPin, Wrench, MessageSquare, X } from "lucide-react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "service" | "location" | "blog" | "faq" | "page";
  category?: string;
}

// Comprehensive searchable content index
const searchableContent: SearchResult[] = [
  // Services
  {
    id: "service-handyman",
    title: "Handyman Services",
    description: "Professional handyman services for all your home repair and maintenance needs. From minor fixes to major projects.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-carpentry",
    title: "Carpentry Services",
    description: "Expert carpentry work including custom cabinets, trim work, deck building, and furniture repair.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-painting",
    title: "Painting Services",
    description: "Interior and exterior painting services with premium quality finishes and attention to detail.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-andersen",
    title: "Andersen Doors & Windows",
    description: "Authorized installer of premium Andersen doors and windows. Partnership with WindowRama Paramus for finest quality products.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-bathroom",
    title: "Bathroom Renovation",
    description: "Complete bathroom remodeling services including tiling, plumbing, fixtures, and custom designs.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-kitchen",
    title: "Kitchen Remodeling",
    description: "Full kitchen renovation services with custom cabinets, countertops, backsplash, and appliance installation.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-flooring",
    title: "Flooring Installation",
    description: "Professional flooring installation including hardwood, laminate, tile, and vinyl plank flooring.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  {
    id: "service-electrical",
    title: "Electrical Work",
    description: "Licensed electrical services including wiring, fixture installation, panel upgrades, and repairs.",
    url: "/services",
    type: "service",
    category: "Services"
  },
  // Locations
  {
    id: "location-paramus",
    title: "Paramus Home Improvement",
    description: "Professional home improvement services in Paramus, NJ. Local contractor with 30+ years experience.",
    url: "/locations/paramus",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-ridgewood",
    title: "Ridgewood Home Improvement",
    description: "Expert home renovation and repair services in Ridgewood, NJ. Trusted local contractor.",
    url: "/locations/ridgewood",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-glen-rock",
    title: "Glen Rock Home Improvement",
    description: "Quality home improvement services in Glen Rock, NJ. Professional craftsmanship guaranteed.",
    url: "/locations/glen-rock",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-fair-lawn",
    title: "Fair Lawn Home Improvement",
    description: "Reliable home renovation services in Fair Lawn, NJ. Licensed and insured contractor.",
    url: "/locations/fair-lawn",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-wyckoff",
    title: "Wyckoff Home Improvement",
    description: "Professional home improvement contractor serving Wyckoff, NJ and surrounding areas.",
    url: "/locations/wyckoff",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-franklin-lakes",
    title: "Franklin Lakes Home Improvement",
    description: "Premium home renovation services in Franklin Lakes, NJ. Expert craftsmanship since 2017.",
    url: "/locations/franklin-lakes",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-saddle-river",
    title: "Saddle River Home Improvement",
    description: "High-end home improvement services in Saddle River, NJ. Luxury renovations and repairs.",
    url: "/locations/saddle-river",
    type: "location",
    category: "Service Areas"
  },
  {
    id: "location-ho-ho-kus",
    title: "Ho-Ho-Kus Home Improvement",
    description: "Trusted home improvement contractor in Ho-Ho-Kus, NJ. Quality workmanship guaranteed.",
    url: "/locations/ho-ho-kus",
    type: "location",
    category: "Service Areas"
  },
  // Pages
  {
    id: "page-about",
    title: "About Us",
    description: "Learn about Dependable Home Improvement - 30+ years of construction experience, established August 2017. NJ licensed and insured.",
    url: "/",
    type: "page",
    category: "Company"
  },
  {
    id: "page-team",
    title: "Our Team",
    description: "Meet our experienced team of professionals dedicated to quality home improvement services.",
    url: "/team",
    type: "page",
    category: "Company"
  },
  {
    id: "page-faq",
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our services, pricing, timeline, and process.",
    url: "/faq",
    type: "page",
    category: "Help"
  },
  {
    id: "page-blog",
    title: "Blog & Resources",
    description: "Home improvement tips, project ideas, and expert advice from our experienced team.",
    url: "/blog",
    type: "page",
    category: "Resources"
  },
  {
    id: "page-videos",
    title: "Video Library",
    description: "Watch expert tutorials covering everything from basic maintenance to complete renovations.",
    url: "/videos",
    type: "page",
    category: "Resources"
  },
  {
    id: "page-referrals",
    title: "Referral Program",
    description: "Earn rewards by referring friends and family. Get $100 for every successful referral.",
    url: "/referrals",
    type: "page",
    category: "Programs"
  },
  {
    id: "page-contact",
    title: "Contact Us",
    description: "Get in touch for a free estimate. Call (201) 637-4345 or fill out our contact form.",
    url: "/#contact",
    type: "page",
    category: "Contact"
  }
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = searchableContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchQuery);
      const descMatch = item.description.toLowerCase().includes(searchQuery);
      const categoryMatch = item.category?.toLowerCase().includes(searchQuery);
      return titleMatch || descMatch || categoryMatch;
    });

    setResults(filtered);
    setShowResults(true);
  }, [query]);

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "service":
        return <Wrench className="h-5 w-5 text-secondary" />;
      case "location":
        return <MapPin className="h-5 w-5 text-secondary" />;
      case "blog":
        return <FileText className="h-5 w-5 text-secondary" />;
      case "faq":
        return <MessageSquare className="h-5 w-5 text-secondary" />;
      default:
        return <FileText className="h-5 w-5 text-secondary" />;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'Search' }]} />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SearchIcon className="h-16 w-16 mx-auto mb-6 text-secondary" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Search Our Site
            </h1>
            <p className="text-lg md:text-xl text-cream/90 mb-8">
              Find services, locations, resources, and answers to your questions
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for services, locations, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg bg-white text-primary border-0 shadow-xl"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {showResults && (
            <div className="mb-8">
              <p className="text-lg text-gray-600">
                Found <span className="font-bold text-primary">{results.length}</span> result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <Link key={result.id} href={result.url}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-secondary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">
                            {getIcon(result.type)}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl text-primary mb-2">
                              {result.title}
                            </CardTitle>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {result.description}
                            </p>
                          </div>
                        </div>
                        {result.category && (
                          <Badge variant="outline" className="flex-shrink-0">
                            {result.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : showResults ? (
            <Card className="text-center py-16">
              <CardContent>
                <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">
                  Try different keywords or browse our popular pages below
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/services">
                    <Button variant="outline">Services</Button>
                  </Link>
                  <Link href="/faq">
                    <Button variant="outline">FAQ</Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline">Blog</Button>
                  </Link>
                  <Link href="/#contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Start Searching</h3>
                <p className="text-gray-500 mb-6">
                  Enter a keyword above to find what you're looking for
                </p>
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-600">Popular Searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["bathroom renovation", "kitchen remodeling", "painting", "carpentry", "Andersen windows", "Paramus"].map((term) => (
                      <Badge
                        key={term}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => setQuery(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
