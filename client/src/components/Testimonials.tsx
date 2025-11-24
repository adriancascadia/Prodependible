import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

interface TestimonialsData {
  reviews: Review[];
  summary: {
    totalReviews: number;
    averageRating: number;
    lastUpdated: string;
  };
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch('/google-reviews.json');
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      // Map Google reviews to testimonial format
      const mappedReviews = data.map((review: any) => ({
        id: review.id,
        name: review.author,
        service: review.verified ? "Verified Google Review" : "Google Review",
        rating: review.rating,
        date: review.date,
        text: review.text,
        verified: review.verified
      }));
      setTestimonials(mappedReviews);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Error loading testimonials:', err);
      setError(true);
      // Fallback to static testimonials
      setTestimonials([
        {
          id: 1,
          name: "Karen M.",
          service: "Residential Service",
          rating: 5,
          date: "2024-10-15",
          text: "The Contractor was the best. Neat, clean, efficient, friendly and did a top notch job for a reasonable price. Highly recommended.",
          verified: true
        },
        {
          id: 2,
          name: "Diane S.",
          service: "Home Improvement",
          rating: 5,
          date: "2024-09-22",
          text: "Sergey and his team delivered high-quality work at a reasonable price. They even went above and beyond by including finishing touches that weren't part of the contract.",
          verified: true
        },
        {
          id: 3,
          name: "Vincent R.",
          service: "Contractor Service",
          rating: 5,
          date: "2024-08-30",
          text: "Very good experience. Went above and beyond the typical contractor. Detailed oriented and most important, take PRIDE in their work. Something 'rare' today.",
          verified: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
          {error && (
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              Using cached reviews
            </Badge>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTestimonials}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary transform hover:-translate-y-2">
            <CardContent className="p-8">
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-lg text-foreground/90 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <Badge variant="outline" className="text-xs border-secondary text-secondary">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(testimonial.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
