import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, Wrench, FileText, HelpCircle, MapPin, Gift, 
  BookOpen, Video, Map
} from "lucide-react";

export default function Sitemap() {
  const sections = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "FAQ", path: "/faq" },
      ]
    },
    {
      title: "Content & Resources",
      icon: BookOpen,
      links: [
        { label: "Blog", path: "/blog" },
        { label: "Case Studies", path: "/case-studies" },
        { label: "Video Guides", path: "/video-guides" },
      ]
    },
    {
      title: "Service Areas",
      icon: MapPin,
      links: [
        { label: "Hackensack, NJ", path: "/location/hackensack-nj" },
        { label: "Teaneck, NJ", path: "/location/teaneck-nj" },
        { label: "Fort Lee, NJ", path: "/location/fort-lee-nj" },
        { label: "Fair Lawn, NJ", path: "/location/fair-lawn-nj" },
        { label: "Bergenfield, NJ", path: "/location/bergenfield-nj" },
        { label: "Paramus, NJ", path: "/location/paramus-nj" },
        { label: "Ridgewood, NJ", path: "/location/ridgewood-nj" },
        { label: "Englewood, NJ", path: "/location/englewood-nj" },
      ]
    },
    {
      title: "Programs",
      icon: Gift,
      links: [
        { label: "Referral Program", path: "/referrals" },
      ]
    }
  ];

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
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="container text-center text-white">
          <Map className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Site Map
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Navigate our website and discover all our services, resources, and service areas
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-primary">
                        {section.title}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.path}>
                            <a className="text-lg text-foreground hover:text-secondary transition-colors flex items-center gap-2 group">
                              <span className="w-2 h-2 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
                              {link.label}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
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
