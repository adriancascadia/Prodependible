import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: string;
}

export default function ReviewWidgets() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Load reviews from Google reviews JSON
    fetch("/google-reviews.json")
      .then(res => res.json())
      .then(data => {
        // Take first 6 reviews for widgets
        // Data is an array directly, not an object with reviews property
        setReviews(data.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Angi Widget */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-secondary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Angi Verified Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-secondary fill-secondary" />
                ))}
              </div>
              <span className="text-xl font-bold text-primary">5.0</span>
              {/* <span className="text-muted-foreground">(127 reviews)</span> */}
            </div>
          </div>
          <a 
            href="/SSA_Certificate_2025.pdf" 
            target="_blank"
            className="hover:scale-105 transition-transform"
          >
            <img 
              src="/SSA_Certificate_2025.jpg" 
              alt="Angi Super Service Award 2025"
              className="w-32 h-auto rounded-lg shadow-lg"
            />
          </a>
        </div>
        <p className="text-muted-foreground mb-4">
          Proud recipient of the Angi Super Service Award 2024 & 2025, recognizing exceptional service and customer satisfaction throughout the year.
        </p>
        <p className="text-sm text-primary/70 italic">
          Click the certificate above to view the full award
        </p>
        <a 
          href="https://www.angi.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
        >
          View All Angi Reviews <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Google Reviews Widget */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Angi/Google Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-secondary fill-secondary" />
                ))}
              </div>
              <span className="text-xl font-bold text-primary">5.0</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {reviews.map((review, idx) => (
            <Card key={idx} className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= review.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{review.text}</p>
                <p className="text-sm font-medium text-primary">— {review.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <a 
          href="https://www.google.com/search?q=dependable+home+improvement" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium mt-6"
        >
          View All Google Reviews <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
