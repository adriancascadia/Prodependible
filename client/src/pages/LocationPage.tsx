import { useRoute } from "wouter";
import { locations, type LocationData } from "@/data/locations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, CheckCircle, Star } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function LocationPage() {
  const [, params] = useRoute("/locations/:slug");
  const location = locations.find(loc => loc.slug === params?.slug);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <p className="text-muted-foreground">The requested location page could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[oklch(0.45_0.08_60)] to-[oklch(0.35_0.08_60)] text-white py-24">
        <div className="container">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-[oklch(0.75_0.15_80)]" />
              <span className="text-[oklch(0.75_0.15_80)] font-semibold">Serving {location.name}, NJ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{location.title}</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">{location.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[oklch(0.75_0.15_80)] hover:bg-[oklch(0.70_0.15_80)] text-[oklch(0.25_0.08_60)]">
                <Phone className="mr-2 h-5 w-5" />
                Call (201) 123-4567
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20 text-white">
                Request Free Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services for This Area */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">Services We Provide in {location.name}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Specialized home improvement services tailored to {location.name}'s unique housing characteristics
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {location.features.map((feature, index) => (
              <Card key={index} className="p-6 border-2 hover:border-[oklch(0.75_0.15_80)] transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[oklch(0.75_0.15_80)] flex-shrink-0 mt-1" />
                  <p className="font-medium">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-16 bg-[oklch(0.98_0.02_80)]">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">What {location.name} Homeowners Say</h2>
          <Card className="max-w-3xl mx-auto p-8 border-2">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[oklch(0.75_0.15_80)] text-[oklch(0.75_0.15_80)]" />
              ))}
            </div>
            <p className="text-lg mb-6 italic">"{location.testimonial.text}"</p>
            <div className="border-t pt-4">
              <p className="font-bold">{location.testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{location.testimonial.project}</p>
              <p className="text-sm text-muted-foreground">{location.name}, NJ</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Service Area Details */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Proudly Serving {location.name} and Surrounding Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">ZIP Codes We Serve</h3>
                <div className="flex flex-wrap gap-2">
                  {location.zipCodes.map((zip) => (
                    <span key={zip} className="px-3 py-1 bg-[oklch(0.98_0.02_80)] rounded-full text-sm font-medium">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Nearby Communities</h3>
                <div className="flex flex-wrap gap-2">
                  {location.nearbyAreas.map((area) => (
                    <span key={area} className="px-3 py-1 bg-[oklch(0.98_0.02_80)] rounded-full text-sm font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[oklch(0.45_0.08_60)] text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why {location.name} Homeowners Choose Dependable</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-5xl font-bold text-[oklch(0.75_0.15_80)] mb-2">20+</div>
                <p className="text-white/90">Years Serving Bergen County</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-[oklch(0.75_0.15_80)] mb-2">1,500+</div>
                <p className="text-white/90">Completed Projects</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-[oklch(0.75_0.15_80)] mb-2">100%</div>
                <p className="text-white/90">Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <Card className="max-w-3xl mx-auto p-12 text-center border-2 border-[oklch(0.75_0.15_80)]">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your {location.name} Home?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free, no-obligation estimate for your home improvement project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[oklch(0.75_0.15_80)] hover:bg-[oklch(0.70_0.15_80)] text-[oklch(0.25_0.08_60)]">
                <Phone className="mr-2 h-5 w-5" />
                Call (201) 123-4567
              </Button>
              <Button size="lg" variant="outline">
                Request Free Estimate
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
