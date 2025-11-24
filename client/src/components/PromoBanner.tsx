import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-secondary via-accent to-secondary text-primary py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Sparkles className="h-5 w-5 flex-shrink-0 animate-pulse" />
            <p className="text-sm md:text-base font-bold">
              <span className="hidden sm:inline">🎉 Winter Special: </span>
              Get 15% off all interior painting projects booked this month!
              <a href="tel:2016374345" className="ml-2 underline hover:no-underline whitespace-nowrap">
                Call Now
              </a>
            </p>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-primary/10 rounded transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
