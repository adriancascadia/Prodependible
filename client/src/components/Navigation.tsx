import { Button } from "@/components/ui/button";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    if (isHomePage) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <>
      <nav className={`transition-all duration-500 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-border" 
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}>
        <div className="w-full px-4 py-5">
          <div className="flex items-center justify-between gap-8">
            <Link href="/">
              <div className="flex items-center gap-4 cursor-pointer">
                <img src="/logo.png" alt="Dependable Home Improvement" className="h-24 w-24 flex-shrink-0" />
                <div className="max-w-[180px]">
                  <h1 className={`text-lg font-bold leading-tight transition-colors ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                    {t('header.title')}
                  </h1>
                  <p className={`text-xs font-medium transition-colors ${scrolled || !isHomePage ? "text-secondary" : "text-secondary"}`}>
                    {t('header.subtitle')}
                  </p>
                </div>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <Link href="/services" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.services')}
              </Link>
              <Link href="/gallery" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.gallery')}
              </Link>
              <Link href="/blog" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.blog')}
              </Link>
              <Link href="/videos" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.videos')}
              </Link>
              <Link href="/faq" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.faq')}
              </Link>
              <Link href="/team" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.team')}
              </Link>
              <Link href="/contact" className={`font-medium transition-colors hover:text-secondary ${scrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                {t('nav.contact')}
              </Link>
              <Link href="/search">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`transition-colors ${scrolled || !isHomePage ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <LanguageToggle />
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToContact}
              >
                {t('nav.freeEstimate')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/search">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`transition-colors ${scrolled || !isHomePage ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors ${scrolled || !isHomePage ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}`}
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
                {t('nav.services')}
              </div>
            </Link>
            <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.gallery')}
              </div>
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.blog')}
              </div>
            </Link>
            <Link href="/videos" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.videos')}
              </div>
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.faq')}
              </div>
            </Link>
            <Link href="/team" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.team')}
              </div>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <div className="py-3 px-4 hover:bg-cream rounded-lg transition-colors font-medium text-primary">
                {t('nav.contact')}
              </div>
            </Link>
            <div className="pt-4 border-t border-border">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToContact();
                }}
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
