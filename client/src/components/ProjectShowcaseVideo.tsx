import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface ShowcaseVideo {
  id: number;
  title: string;
  location: string;
  duration: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  category: string;
}

export default function ProjectShowcaseVideo() {
  const [selectedVideo, setSelectedVideo] = useState<ShowcaseVideo | null>(null);

  const showcaseVideos: ShowcaseVideo[] = [
    {
      id: 1,
      title: "Modern Home Renovation - Complete Transformation",
      location: "Bergen County, NJ",
      duration: "8:45",
      youtubeId: "x9CTbGw6MLg",
      thumbnail: "https://img.youtube.com/vi/x9CTbGw6MLg/maxresdefault.jpg",
      description: "Watch this stunning complete home renovation featuring modern design, custom finishes, and expert craftsmanship.",
      category: "Full Renovation"
    },
    {
      id: 2,
      title: "Kitchen Remodeling Project - Before & After",
      location: "Northern NJ",
      duration: "6:30",
      youtubeId: "lxAKbWr1bwQ",
      thumbnail: "https://img.youtube.com/vi/lxAKbWr1bwQ/maxresdefault.jpg",
      description: "See how we transformed this outdated kitchen into a modern, functional space with custom cabinetry and premium finishes.",
      category: "Kitchen Remodel"
    },
    {
      id: 3,
      title: "Deck Construction & Outdoor Living Space",
      location: "Bergen County, NJ",
      duration: "5:20",
      youtubeId: "nYRFGHSYvpE",
      thumbnail: "https://img.youtube.com/vi/nYRFGHSYvpE/maxresdefault.jpg",
      description: "Custom deck construction project showcasing our expertise in outdoor living spaces and structural carpentry.",
      category: "Deck Building"
    }
  ];

  return (
    <>
      {/* Featured Video - Large Hero */}
      <div className="mb-12">
        <Card 
          className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-secondary"
          onClick={() => setSelectedVideo(showcaseVideos[0])}
        >
          <div className="relative aspect-video bg-gray-900 overflow-hidden">
            <img 
              src={showcaseVideos[0].thumbnail}
              alt={showcaseVideos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${showcaseVideos[0].youtubeId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 rounded-full p-6 group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="h-12 w-12 text-primary fill-primary" />
              </div>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <Badge className="mb-3 bg-secondary text-primary border-0">
                Featured Project
              </Badge>
              <h3 className="text-3xl font-bold mb-2">{showcaseVideos[0].title}</h3>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{showcaseVideos[0].location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{showcaseVideos[0].duration}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Videos Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {showcaseVideos.slice(1).map((video) => (
          <Card 
            key={video.id}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-secondary"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary fill-primary" />
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            <CardContent className="p-6">
              <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary">
                {video.category}
              </Badge>
              <h4 className="font-bold text-primary text-lg mb-2 line-clamp-2">{video.title}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{video.location}</span>
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
            className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden"
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
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <div className="p-6 bg-white">
              <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary">
                {selectedVideo.category}
              </Badge>
              <h3 className="text-2xl font-bold text-primary mb-3">{selectedVideo.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{selectedVideo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
