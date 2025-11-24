import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, CheckCircle2, Download } from "lucide-react";

interface VideoGuide {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  tips: string[];
}

export default function VideoGuides() {
  const [guides, setGuides] = useState<VideoGuide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<VideoGuide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuides() {
      try {
        const response = await fetch("/video-guides.json");
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Failed to load video guides:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGuides();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
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
            Video How-To Guides
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Expert tips and techniques to help you maintain and improve your home
          </p>
        </div>
      </section>

      {/* Video Player Section */}
      {selectedGuide && (
        <section className="py-16 bg-muted/30">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedGuide.videoUrl}
                    title={selectedGuide.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <Badge className="mb-3">{selectedGuide.category}</Badge>
                  <h2 className="text-3xl font-heading font-bold mb-4">{selectedGuide.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{selectedGuide.description}</p>
                </div>
              </div>
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Key Takeaways</h3>
                    <ul className="space-y-3">
                      {selectedGuide.tips.map((tip, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            {selectedGuide ? "More Guides" : "All Guides"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guides.map((guide) => (
              <Card 
                key={guide.id} 
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  setSelectedGuide(guide);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={guide.thumbnail} 
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-black/70 text-white">
                    <Clock className="mr-1 h-3 w-3" />
                    {guide.duration}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {guide.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {guide.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Downloadable Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Free PDF guides and checklists to help you plan and maintain your home improvement projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Deck Maintenance Checklist",
                description: "Seasonal maintenance tasks to keep your deck in top condition",
                pages: "4 pages"
              },
              {
                title: "Kitchen Remodel Planning Guide",
                description: "Step-by-step guide to planning your kitchen renovation",
                pages: "12 pages"
              },
              {
                title: "Basement Finishing Checklist",
                description: "Everything you need to consider before finishing your basement",
                pages: "6 pages"
              },
              {
                title: "Door Installation Guide",
                description: "Professional tips for choosing and installing new doors",
                pages: "8 pages"
              },
              {
                title: "Home Improvement Budget Template",
                description: "Excel template to track costs and stay on budget",
                pages: "Spreadsheet"
              },
              {
                title: "Contractor Questions Checklist",
                description: "Essential questions to ask before hiring a contractor",
                pages: "2 pages"
              }
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Download className="h-12 w-12 text-secondary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.pages}</Badge>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need help with your project? Our team is here to assist.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Contact Us for Expert Advice
              </Button>
            </Link>
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
