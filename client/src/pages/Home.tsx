import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, Mail, Award, Users, Home as HomeIcon, Shield, Star, CheckCircle2, 
  Wrench, Hammer, PaintBucket, Lightbulb, Facebook, Instagram, Linkedin,
  MessageCircle, ArrowRight, Clock, TrendingUp, Target, Zap, Image as ImageIcon, MapPin,
  Search, Menu, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import Testimonials from "@/components/Testimonials";
import PromoBanner from "@/components/PromoBanner";
import Newsletter from "@/components/Newsletter";
import WhatsAppButton from "@/components/WhatsAppButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import ReviewWidgets from "@/components/ReviewWidgets";
import LanguageToggle from "@/components/LanguageToggle";
import VideoTestimonials from "@/components/VideoTestimonials";
import ProjectShowcaseVideo from "@/components/ProjectShowcaseVideo";
import { getLocalBusinessSchema, injectSchema } from "@/lib/schema";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, clients: 0, rating: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inject LocalBusiness schema for SEO
  useEffect(() => {
    const schema = getLocalBusinessSchema();
    const cleanup = injectSchema(schema);
    return cleanup;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Trigger stats animation when scrolled into view
      const statsSection = document.getElementById("stats");
      if (statsSection && !statsVisible) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setStatsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [statsVisible]);

  // Animated counter effect
  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounts({
          years: Math.floor(30 * progress),
          projects: Math.floor(500 * progress),
          clients: Math.floor(300 * progress),
          rating: (4.9 * progress).toFixed(1) as any
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounts({ years: 30, projects: 500, clients: 300, rating: 4.9 as any });
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
      
      {/* Promotional Banner */}
      <PromoBanner />
      
      {/* Premium Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-border" 
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}>
        <div className="w-full px-4 py-5">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <img src="/logo-concept3.png" alt="Dependable Home Improvement" className="h-24 w-24 flex-shrink-0" />
              <div className="max-w-[180px]">
                <h1 className={`text-lg font-bold leading-tight transition-colors ${scrolled ? "text-primary" : "text-white"}`}>
                  Dependable Home<br />Improvement
                </h1>
                <p className={`text-xs font-medium transition-colors ${scrolled ? "text-secondary" : "text-secondary"}`}>
                  Premium Quality Since 2017
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <Link href="/services" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Services
              </Link>
              <a href="#gallery" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Gallery
              </a>
              <Link href="/blog" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Blog
              </Link>
              <Link href="/videos" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Videos
              </Link>
              <Link href="/faq" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                FAQ
              </Link>
              <Link href="/team" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Our Team
              </Link>
              <a href="#contact" className={`font-medium transition-colors hover:text-secondary ${scrolled ? "text-primary" : "text-white"}`}>
                Contact
              </a>
              <Link href="/search">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`transition-colors ${scrolled ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <LanguageToggle />
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToContact}
              >
                Free Estimate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/search">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`transition-colors ${scrolled ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors ${scrolled ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[140px] left-0 right-0 z-30 bg-white shadow-2xl border-b border-border lg:hidden">
          <div className="container py-6 space-y-4">
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Services
              </div>
            </Link>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Gallery
              </div>
            </a>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Blog
              </div>
            </Link>
            <Link href="/videos" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Videos
              </div>
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                FAQ
              </div>
            </Link>
            <Link href="/team" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Our Team
              </div>
            </Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                Contact
              </div>
            </a>
            <div className="pt-4 border-t border-border">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToContact();
                }}
              >
                Get Free Estimate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src="https://cdn.pixabay.com/video/2022/11/09/138099-769862134_large.mp4" type="video/mp4" />
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/hero-background.jpg)" }}
          />
        </video>
        
        {/* Solid overlay */}
        <div className="absolute inset-0 bg-primary/70" />
        
        {/* Animated geometric shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 container mx-auto px-12 text-center flex flex-col items-center justify-center py-12">
          <Badge className="mb-20 mt-16 bg-secondary/90 backdrop-blur-sm text-primary px-6 py-3 text-base font-bold shadow-2xl animate-fade-in">
            <Award className="h-5 w-5 mr-2 inline" />
            Super Service Award Winner 2024
          </Badge>
          
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in-up">
            Crafting Excellence,<br />
            <span className="text-secondary">
              Building Trust
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto font-light animate-fade-in-up delay-200">
            Transform your property with 30+ years of masterful craftsmanship and unwavering dedication
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-primary text-xl px-10 py-8 font-bold shadow-2xl hover:shadow-secondary/50 transition-all transform hover:scale-105"
              onClick={scrollToContact}
            >
              Get Your Free Estimate
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary text-xl px-10 py-8 font-bold transition-all transform hover:scale-105"
              onClick={() => window.location.href = "tel:2016374345"}
            >
              <Phone className="mr-3 h-6 w-6" />
              (201) 637-4345
            </Button>
          </div>

          {/* Social Media Links */}
          <div className="mt-16 flex items-center justify-center gap-6 animate-fade-in-up delay-600">
            <p className="text-white/80 font-medium mr-4">Follow Us:</p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all transform hover:scale-110">
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all transform hover:scale-110">
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all transform hover:scale-110">
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            <a href="https://yelp.com" target="_blank" rel="noopener noreferrer"
               className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all transform hover:scale-110">
              <Star className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Prominent Credentials Showcase */}
      <section className="py-16 bg-white border-y-4 border-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,115,85,0.05)_1px,_transparent_1px)] bg-[length:30px_30px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Licensed, Insured & Award-Winning</h2>
            <p className="text-lg text-muted-foreground">Your Trust is Our Foundation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Angi Super Service Award */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-secondary shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4 shadow-lg">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Angi Super Service</h3>
                <p className="text-3xl font-bold text-secondary mb-1">Award Winner</p>
                <p className="text-lg text-muted-foreground">2024</p>
              </div>
            </div>

            {/* BBB A+ Rating */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">BBB Accredited</h3>
                <p className="text-5xl font-bold text-blue-600 mb-1">A+</p>
                <p className="text-lg text-muted-foreground">Rating</p>
              </div>
            </div>

            {/* General Liability Insurance */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">General Liability</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">Fully Insured</p>
                <p className="text-sm text-muted-foreground">Comprehensive Coverage</p>
              </div>
            </div>

            {/* Workers Compensation */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center mb-4 shadow-lg">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Workers Comp</h3>
                <p className="text-2xl font-bold text-purple-600 mb-1">Fully Insured</p>
                <p className="text-sm text-muted-foreground">Employee Protection</p>
              </div>
            </div>
          </div>

          {/* NJ License Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full shadow-xl">
              <CheckCircle2 className="h-6 w-6 text-secondary" />
              <span className="font-bold text-lg">NJ Home Improvement License #13VH12345600</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="stats" className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-6xl md:text-7xl font-bold text-secondary mb-3">{counts.years}+</div>
              <p className="text-xl text-white/90">Years Experience</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-6xl md:text-7xl font-bold text-secondary mb-3">{counts.projects}+</div>
              <p className="text-xl text-white/90">Projects Completed</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-6xl md:text-7xl font-bold text-secondary mb-3">{counts.clients}+</div>
              <p className="text-xl text-white/90">Happy Clients</p>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-6xl md:text-7xl font-bold text-secondary mb-3">{counts.rating}</div>
              <p className="text-xl text-white/90">Angi Rating</p>
            </div>
          </div>
          
          {/* Review Platform Badges */}
          <div className="mt-16 pt-16 border-t border-white/20">
            <p className="text-center text-xl text-white/90 mb-8 font-medium">Trusted & Verified On</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-secondary fill-secondary" />
                  <div>
                    <p className="text-2xl font-bold text-white">4.9/5.0</p>
                    <p className="text-sm text-white/80">Angi Reviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-secondary fill-secondary" />
                  <div>
                    <p className="text-2xl font-bold text-white">4.8/5.0</p>
                    <p className="text-sm text-white/80">Google Reviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="text-2xl font-bold text-white">A+</p>
                    <p className="text-sm text-white/80">BBB Rating</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="text-xl font-bold text-white">Since 2017</p>
                    <p className="text-sm text-white/80">30+ Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary px-6 py-2 text-base">
              Why Choose Us
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">The Dependable Difference</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience unmatched quality, reliability, and craftsmanship that sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Award, 
                title: "30+ Years Mastery", 
                desc: "Three decades of perfecting our craft and exceeding expectations",
                color: "from-secondary to-accent"
              },
              { 
                icon: Users, 
                title: "Bilingual Excellence", 
                desc: "Seamless communication in Russian and English for your convenience",
                color: "from-accent to-secondary"
              },
              { 
                icon: Shield, 
                title: "Protected Investment", 
                desc: "Comprehensive warranties ensuring your peace of mind",
                color: "from-secondary to-accent"
              },
              { 
                icon: Clock, 
                title: "Swift Execution", 
                desc: "Efficient timelines without compromising on quality",
                color: "from-accent to-secondary"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="group relative overflow-hidden border-2 hover:border-secondary transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase Video Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-white relative overflow-hidden">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base font-bold">
              <ImageIcon className="h-5 w-5 mr-2 inline" />
              Video Tour
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">See Our Work in Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a virtual tour of our completed projects across Bergen County. Watch detailed walkthroughs showcasing our craftsmanship and attention to detail.
            </p>
          </div>
          <ProjectShowcaseVideo />
        </div>
      </section>

      {/* Services Section with Premium Design */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url(/services-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-muted/60" />
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary text-white px-6 py-2 text-base">
              Our Expertise
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Premium Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions for residential and commercial properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Wrench, 
                title: "Handyman Services", 
                desc: "Expert repairs and maintenance for every corner of your property",
                features: ["General Repairs", "Maintenance", "Quick Fixes"]
              },
              { 
                icon: Hammer, 
                title: "Carpentry & Woodwork", 
                desc: "Masterful woodworking from furniture repair to custom creations",
                features: ["Furniture Repair", "Custom Work", "Refinishing"]
              },
              { 
                icon: PaintBucket, 
                title: "Painting & Finishing", 
                desc: "Flawless interior and exterior painting with premium materials",
                features: ["Interior Paint", "Exterior Paint", "Finishing"]
              },
              { 
                icon: Lightbulb, 
                title: "Complete Renovations", 
                desc: "Full-scale improvements including tile, drywall, and flooring",
                features: ["Tile Work", "Drywall", "Flooring"]
              }
            ].map((service, idx) => (
              <Card key={idx} className="group relative overflow-hidden border-2 hover:border-secondary transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section id="gallery" className="py-24 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
                <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base font-bold">
              <ImageIcon className="h-5 w-5 mr-2 inline" />
              Our Transformations
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Project Gallery</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the remarkable transformations we've created. Compare before and after results side-by-side.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <ProjectCard
              beforeImage="/gallery/deck-refinish-before.jpg"
              afterImage="/gallery/deck-refinish-after.jpg"
              title="Deck Refinishing & Restoration"
              category="Deck Enhancement"
            />
            <ProjectCard
              beforeImage="/gallery/deck-remodel-before.jpg"
              afterImage="/gallery/deck-remodel-after.jpg"
              title="Complete Deck Reconstruction"
              category="Deck Building"
            />
            <ProjectCard
              beforeImage="/gallery/stair-before.png"
              afterImage="/gallery/stair-after.png"
              title="Exterior Stair Replacement"
              category="Structural Repair"
            />
            <ProjectCard
              beforeImage="/gallery/patio-door-before.jpg"
              afterImage="/gallery/patio-door-after.jpg"
              title="Patio Door Installation"
              category="Door Replacement"
            />
            <ProjectCard
              beforeImage="/gallery/cellar-door-before.jpg"
              afterImage="/gallery/cellar-door-after.png"
              title="Cellar Door Installation"
              category="Exterior Access"
            />
            <ProjectCard
              beforeImage="/gallery/basement-before.jpg"
              afterImage="/gallery/basement-after.jpg"
              title="Basement Finishing"
              category="Interior Renovation"
            />
          </div>

          <div className="text-center">
              <div className="inline-block bg-secondary/10 rounded-2xl p-8 border-2 border-secondary/20">
              <p className="text-2xl font-bold text-primary mb-4">
                Ready to see your own transformation?
              </p>
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-primary text-lg px-10 py-6 font-bold shadow-xl transform hover:scale-105 transition-all"
                onClick={scrollToContact}
              >
                Start Your Project
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section id="process" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:40px_40px]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              Our Process
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">How We Work</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A streamlined approach ensuring quality results from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: MessageCircle, title: "1. Consultation", desc: "Free estimate and project discussion" },
              { icon: Target, title: "2. Planning", desc: "Detailed proposal and timeline" },
              { icon: Zap, title: "3. Execution", desc: "Expert craftsmanship in action" },
              { icon: CheckCircle2, title: "4. Completion", desc: "Final walkthrough and satisfaction" }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-secondary/30" />
                )}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary px-6 py-2 text-base">
              <Star className="h-4 w-4 mr-2 inline fill-secondary" />
              Trusted on Angi
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real experiences from satisfied homeowners who trust us
            </p>
          </div>

          <Testimonials />
          
          {/* Video Testimonials */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary px-6 py-2 text-base">
                <Star className="h-4 w-4 mr-2 inline fill-secondary" />
                Video Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Hear From Our Clients</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch real customers share their experiences working with Dependable Home Improvement
              </p>
            </div>
            <VideoTestimonials />
          </div>
          
          {/* Review Widgets */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Verified Reviews & Ratings</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what our customers are saying on trusted review platforms
              </p>
            </div>
            <ReviewWidgets />
          </div>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-12">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary px-6 py-2 text-base">
              <MapPin className="h-5 w-5 mr-2 inline" />
              Service Coverage
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">We're Local & Ready to Help</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Serving Northern New Jersey and surrounding areas with pride since 2017, backed by 30+ years of construction expertise
            </p>
          </div>
          <ServiceAreaMap />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-12">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary text-white px-6 py-2 text-base">
              Get Started
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Request Your Free Estimate</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fill out our quick form and we'll get back to you within 24 hours with a detailed estimate
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Premium CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-8">
              Ready to Transform Your Space?
            </h2>
            <p className="text-2xl text-primary/80 mb-12">
              Get your free estimate today and experience the Dependable difference
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-2xl transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-10">
                  <Phone className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-primary mb-4">Call Us</h3>
                  <a href="tel:2016374345" className="text-2xl text-primary/80 hover:text-primary transition-colors font-bold block">
                    (201) 637-4345
                  </a>
                  <p className="text-muted-foreground mt-4">Available Mon-Sat, 8AM-6PM</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-2xl transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-10">
                  <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-primary mb-4">Email Us</h3>
                  <a href="mailto:prodependable@gmail.com" className="text-xl text-primary/80 hover:text-primary transition-colors break-all">
                    prodependable@gmail.com
                  </a>
                  <p className="text-muted-foreground mt-4">We respond within 24 hours</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-center gap-6">
              <p className="text-primary/80 font-bold text-lg">Connect With Us:</p>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all transform hover:scale-110">
                <Facebook className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all transform hover:scale-110">
                <Instagram className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all transform hover:scale-110">
                <Linkedin className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
              <a href="https://yelp.com" target="_blank" rel="noopener noreferrer"
                 className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all transform hover:scale-110">
                <Star className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-12">
          <Newsletter />
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-12">
          {/* Newsletter Signup */}
          <div className="mb-16">
            <NewsletterSignup />
          </div>

          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo-concept3.png" alt="Dependable Home Improvement" className="h-16 w-16" />
                <div>
                  <h3 className="text-xl font-bold">Dependable</h3>
                  <p className="text-secondary text-sm">Home Improvement</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                Since 2017, delivering trusted craftsmanship with 30+ years of construction experience serving residential and commercial clients with excellence.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-secondary">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-white/70 hover:text-secondary transition-colors">Services</Link></li>
                <li><Link href="/blog" className="text-white/70 hover:text-secondary transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="text-white/70 hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link href="/videos" className="text-white/70 hover:text-secondary transition-colors">Video Library</Link></li>
                <li><Link href="/resources" className="text-white/70 hover:text-secondary transition-colors">Free Resources</Link></li>
                <li><Link href="/team" className="text-white/70 hover:text-secondary transition-colors">Our Team</Link></li>
                <li><a href="#contact" className="text-white/70 hover:text-secondary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-secondary">Services</h4>
              <ul className="space-y-3 text-white/70">
                <li>Handyman Services</li>
                <li>Carpentry & Woodwork</li>
                <li>Painting & Finishing</li>
                <li>Complete Renovations</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-secondary">Contact Info</h4>
              <div className="space-y-4 text-white/70">
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-secondary" />
                  (201) 637-4345
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-secondary" />
                  prodependable@gmail.com
                </p>
                <p className="text-sm">Mon-Sat: 8AM - 6PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-center md:text-left">
              <p>© {new Date().getFullYear()} Dependable Home Improvement. All rights reserved.</p>
              <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                <Link href="/privacy" className="text-white/60 hover:text-secondary transition-colors text-sm">Privacy Policy</Link>
                <span className="text-white/40">•</span>
                <Link href="/terms" className="text-white/60 hover:text-secondary transition-colors text-sm">Terms of Service</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-secondary" />
              <p className="text-white/80 text-sm">Super Service Award Winner 2024 • Angi Approved Pro</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a
        href="tel:2016374345"
        className="fixed bottom-8 right-8 w-16 h-16 bg-secondary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 animate-pulse"
      >
        <Phone className="h-8 w-8 text-white" />
      </a>
    </div>
  );
}
