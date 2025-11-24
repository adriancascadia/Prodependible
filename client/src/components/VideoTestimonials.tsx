import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Quote } from "lucide-react";
import { useState } from "react";

interface VideoTestimonial {
  id: number;
  name: string;
  location: string;
  project: string;
  youtubeId: string;
  thumbnail: string;
  quote: string;
}

export default function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Sarah & Mike Johnson",
      location: "Teaneck, NJ",
      project: "Complete Kitchen Remodel",
      youtubeId: "7JJhnNR6408",
      thumbnail: "https://img.youtube.com/vi/7JJhnNR6408/maxresdefault.jpg",
      quote: "The team transformed our outdated kitchen into a modern masterpiece. Their attention to detail was incredible!"
    },
    {
      id: 2,
      name: "Robert Martinez",
      location: "Hackensack, NJ",
      project: "Bathroom Renovation",
      youtubeId: "irspt21Jkyw",
      thumbnail: "https://img.youtube.com/vi/irspt21Jkyw/maxresdefault.jpg",
      quote: "Professional, reliable, and the results exceeded our expectations. We love our new bathroom!"
    },
    {
      id: 3,
      name: "Jennifer Chen",
      location: "Fort Lee, NJ",
      project: "Deck Construction",
      youtubeId: "x9CTbGw6MLg",
      thumbnail: "https://img.youtube.com/vi/x9CTbGw6MLg/maxresdefault.jpg",
      quote: "From consultation to completion, the experience was seamless. Our new deck is perfect for family gatherings!"
    }
  ];

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-secondary"
            onClick={() => setSelectedVideo(testimonial)}
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <img 
                src={testimonial.thumbnail}
                alt={`${testimonial.name} testimonial`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${testimonial.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary fill-primary" />
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground italic line-clamp-2">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-bold text-primary text-lg">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <Badge className="mt-2 bg-secondary/10 text-secondary border-secondary">
                  {testimonial.project}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={`${selectedVideo.name} testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-primary mb-2">{selectedVideo.name}</h3>
              <p className="text-muted-foreground mb-3">{selectedVideo.location} • {selectedVideo.project}</p>
              <p className="text-lg italic text-muted-foreground">"{selectedVideo.quote}"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
