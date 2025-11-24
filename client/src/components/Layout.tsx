import { ReactNode } from "react";
import { useLocation } from "wouter";
import Navigation from "./Navigation";
import PromoBanner from "./PromoBanner";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Homepage has its own navigation and layout
  if (isHomePage) {
    return <>{children}</>;
  }

  // All other pages get the shared navigation
  return (
    <div className="min-h-screen">
      <WhatsAppButton />
      <PromoBanner />
      <Navigation />
      <div className="pt-32">
        {children}
      </div>
    </div>
  );
}
