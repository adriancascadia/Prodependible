import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Phone, Mail, Star, Award, Users, CheckCircle2,
  ArrowRight, Home as HomeIcon
} from "lucide-react";
import { getLocalBusinessSchema, injectSchema } from "@/lib/schema";

interface LocationData {
  slug: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  description: string;
  population: string;
  features: string[];
}

export default function Location() {
  const [, params] = useRoute("/location/:slug");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocation() {
      try {
        const response = await fetch("/locations.json");
        const locations: LocationData[] = await response.json();
        const found = locations.find(loc => loc.slug === params?.slug);
        setLocation(found || null);
      } catch (error) {
        console.error("Failed to load location data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadLocation();
  }, [params?.slug]);

  // Inject location-specific schema
  useEffect(() => {
    if (location) {
      const schema = getLocalBusinessSchema();
      // Customize schema for this location
      schema.address.addressLocality = location.city;
      schema.address.postalCode = location.zip;
      const cleanup = injectSchema(schema);
      return cleanup;
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Location Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <img src="/logo-actual.svg" alt="Dependable Home Improvement" className="h-12 w-12" />
              <div>
                <h1 className="text-xl font-bold text-primary">Dependable Home Improvement</h1>
                <p className="text-xs text-secondary font-medium">Premium Quality Since 2017</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              <a href="tel:2016574345">
                <Button className="bg-secondary hover:bg-secondary/90">
                  <Phone className="mr-2 h-4 w-4" />
                  (201) 657-4345
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-24">
        <div className="absolute inset-0 bg-[url(/hero-background.jpg)] opacity-10 bg-cover bg-center"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-secondary text-primary">
              <MapPin className="mr-2 h-4 w-4" />
              Serving {location.city}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Home Improvement Services in {location.city}, {location.state}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {location.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-bold">
                Get Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="tel:2016574345">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">{location.population}</h3>
                <p className="text-muted-foreground">Residents Served</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">30+ Years</h3>
                <p className="text-muted-foreground">Construction Experience</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-2xl mb-2">4.9/5.0</h3>
                <p className="text-muted-foreground">Customer Rating</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-primary mb-8 text-center">
              Why {location.city} Homeowners Choose Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Local Expertise</h3>
                  <p className="text-muted-foreground">
                    We understand {location.city}'s unique architecture and building requirements
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Fast Response</h3>
                  <p className="text-muted-foreground">
                    Quick estimates and project start times for {location.city} residents
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Bilingual Service</h3>
                  <p className="text-muted-foreground">
                    English and Russian speaking team to serve {location.city}'s diverse community
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Quality Guarantee</h3>
                  <p className="text-muted-foreground">
                    Warranties offered on all work performed in {location.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-secondary/20">
              <h3 className="text-2xl font-heading font-bold mb-4">About {location.city}</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {location.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                Located in {location.county}, {location.city} is home to {location.population} residents. 
                We're proud to serve this vibrant community with professional home improvement services 
                that enhance property value and quality of life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:2016574345" className="flex-1">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    <Phone className="mr-2 h-4 w-4" />
                    (201) 657-4345
                  </Button>
                </a>
                <a href="mailto:prodependable@gmail.com" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Services in {location.city}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive home improvement solutions for {location.city} homeowners
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {["Deck Building & Refinishing", "Door Installation", "Basement Finishing", "Custom Carpentry"].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{service}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Professional {service.toLowerCase()} services in {location.city}
                  </p>
                  <Link href="/services">
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary via-secondary/90 to-accent">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Transform Your {location.city} Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free estimate today. No obligation, just honest advice and quality craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:2016574345">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                <Phone className="mr-2 h-5 w-5" />
                Call (201) 657-4345
              </Button>
            </a>
            <Link href="/#contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Request Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container text-center">
          <p className="text-white/80">
            © 2024 Dependable Home Improvement. Serving {location.city}, {location.state} and all of {location.county}.
          </p>
        </div>
      </footer>
    </div>
  );
}
