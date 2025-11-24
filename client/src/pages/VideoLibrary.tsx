import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, ChevronRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Loader2 } from "lucide-react";

interface Video {
  id: number;
  title: string;
  youtubeId: string;
  channel: string;
  duration: string;
  description: string;
  difficulty: string;
  views: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  videos: Video[];
}

interface VideoLibraryData {
  categories: Category[];
}

export default function VideoLibrary() {
  const [data, setData] = useState<VideoLibraryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetch('/video-library.json')
      .then(res => res.json())
      .then((data: VideoLibraryData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading video library:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load video library</p>
      </div>
    );
  }

  const categories = data.categories;
  const allVideos = categories.flatMap(cat => cat.videos);
  const displayVideos = selectedCategory === "all" 
    ? allVideos 
    : categories.find(cat => cat.id === selectedCategory)?.videos || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'Video Library' }]} />
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Video How-To Library
            </h1>
            <p className="text-lg md:text-xl text-cream/90">
              Learn from the best. Watch expert tutorials covering everything from basic maintenance to complete renovations.
            </p>
          </div>
        </div>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-5xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-600">{selectedVideo.channel}</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex gap-3 mb-4">
              <Badge className={getDifficultyColor(selectedVideo.difficulty)}>
                {selectedVideo.difficulty}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selectedVideo.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {selectedVideo.views} views
              </Badge>
            </div>

            <p className="text-gray-700">{selectedVideo.description}</p>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              All Videos
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container">
          {selectedCategory !== "all" && (
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {categories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayVideos.map(video => (
              <Card 
                key={video.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to standard quality thumbnail if maxres doesn't exist
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(video.difficulty)}>
                      {video.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {video.channel}
                  </p>
                  
                  <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                    {video.description}
                  </p>

                  <Button 
                    variant="ghost" 
                    className="w-full group/btn"
                  >
                    Watch Video
                    <ChevronRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Need Professional Help?
            </h2>
            <p className="text-lg text-cream/90 mb-8">
              While these videos are great for DIY enthusiasts, some projects require professional expertise. 
              Our team has 30+ years of experience and can handle any home improvement project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-secondary hover:bg-secondary/90 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Get Free Estimate
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => window.location.href = 'tel:2016374345'}
              >
                Call (201) 637-4345
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
