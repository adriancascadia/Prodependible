import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, MapPin, Clock, DollarSign, Star, CheckCircle2,
  Phone, Mail, Calendar
} from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  budget: string;
  year: string;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    text: string;
    author: string;
    rating: number;
  };
  images: {
    before: string;
    after: string;
  };
}

export default function CaseStudies() {
  const [, params] = useRoute("/case-studies/:slug");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        const response = await fetch("/case-studies.json");
        const data = await response.json();
        setCaseStudies(data);
        
        if (params?.slug) {
          const study = data.find((s: CaseStudy) => s.slug === params.slug);
          setSelectedStudy(study || null);
        }
      } catch (error) {
        console.error("Failed to load case studies:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudies();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Individual case study view
  if (selectedStudy) {
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
              <Link href="/case-studies">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-accent py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white">
                {selectedStudy.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {selectedStudy.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedStudy.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {selectedStudy.duration}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {selectedStudy.budget}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {selectedStudy.year}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
              Transformation
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div>
                <Badge className="mb-4">Before</Badge>
                <img 
                  src={selectedStudy.images.before} 
                  alt="Before" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <Badge className="mb-4 bg-secondary text-white">After</Badge>
                <img 
                  src={selectedStudy.images.after} 
                  alt="After" 
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  The Challenge
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedStudy.challenge}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  Our Solution
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedStudy.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-primary mb-8">
              Results Delivered
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedStudy.results.map((result, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <Card className="border-2 border-secondary/20">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(selectedStudy.testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-xl italic text-foreground/90 mb-6 leading-relaxed">
                  "{selectedStudy.testimonial.text}"
                </p>
                <p className="font-bold text-primary">
                  — {selectedStudy.testimonial.author}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-secondary to-accent">
          <div className="container text-center">
            <h2 className="text-4xl font-heading font-bold text-white mb-6">
              Ready for Your Own Transformation?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom solution that exceeds your expectations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:2016574345">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (201) 657-4345
                </Button>
              </a>
              <a href="mailto:prodendable@gmail.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-white py-8">
          <div className="container text-center">
            <p className="text-white/80">
              © 2024 Dependable Home Improvement. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Case studies listing view
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
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="container text-center text-white">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Project Case Studies
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Real transformations, real results. See how we've helped homeowners across Bergen County
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={study.images.after} 
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {study.featured && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {study.category}
                  </Badge>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-secondary transition-colors">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {study.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {study.duration}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {study.challenge}
                  </p>
                  <Link href={`/case-studies/${study.slug}`}>
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      Read Full Story
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container text-center">
          <p className="text-white/80">
            © 2024 Dependable Home Improvement. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
