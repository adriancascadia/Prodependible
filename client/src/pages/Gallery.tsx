import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Images, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Kitchen Renovation",
    category: "Kitchen",
    image: "/gallery-kitchen.png",
    description: "Complete kitchen transformation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 2,
    title: "Luxury Bathroom Remodel",
    category: "Bathroom",
    image: "/gallery-bathroom.jpg",
    description: "Spa-like bathroom featuring custom tile work, frameless shower, and double vanity."
  },
  {
    id: 3,
    title: "Exterior Home Painting",
    category: "Painting",
    image: "/gallery-exterior.jpg",
    description: "Professional exterior painting with premium weather-resistant paint for lasting beauty."
  },
  {
    id: 4,
    title: "Hardwood Floor Installation",
    category: "Flooring",
    image: "/gallery-floor.jpg",
    description: "Beautiful hardwood flooring installation with expert craftsmanship and perfect finish."
  },
  {
    id: 5,
    title: "Interior Painting Project",
    category: "Painting",
    image: "/gallery-painting.jpg",
    description: "Fresh interior paint with careful prep work and clean, professional results."
  },
  {
    id: 6,
    title: "Custom Furniture Assembly",
    category: "Carpentry",
    image: "/gallery-furniture.png",
    description: "Expert furniture assembly and custom woodwork for functional living spaces."
  }
];

const categories = ["All", "Kitchen", "Bathroom", "Painting", "Flooring", "Carpentry"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Calculate category counts
  const getCategoryCount = (category: string) => {
    if (category === "All") return galleryItems.length;
    return galleryItems.filter(item => item.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'Project Gallery' }]} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Images className="h-5 w-5 mr-2 inline" />
              Our Work
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Project Gallery</h1>
            <p className="text-xl text-white/90">
              Explore our portfolio of completed projects showcasing quality craftsmanship and attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="px-6"
              >
                {category}
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${selectedCategory === category ? 'bg-secondary text-primary' : 'bg-primary/10 text-primary'}`}
                >
                  {getCategoryCount(category)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-border hover:border-secondary transition-all duration-300 shadow-md hover:shadow-xl">
                  {!loadedImages.has(item.id) && (
                    <Skeleton className="absolute inset-0 w-full h-64" />
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 ${!loadedImages.has(item.id) ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => handleImageLoad(item.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <Badge className="mb-2 bg-secondary text-white">
                        {item.category}
                      </Badge>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => { setSelectedImage(null); setIsZoomed(false); }}>
        <DialogContent className="max-w-4xl p-0">
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.title || "Gallery Image"}</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div>
              <div className="relative overflow-auto max-h-[70vh]">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className={`w-full h-auto object-contain cursor-zoom-in transition-transform duration-300 ${
                    isZoomed ? 'scale-200 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{
                    transformOrigin: 'center center',
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10"
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setIsZoomed(false); }}
                >
                  <X className="h-6 w-6" />
                </Button>
                {isZoomed && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm z-10">
                    Click image to zoom out
                  </div>
                )}
                {!isZoomed && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm z-10">
                    Click image to zoom in
                  </div>
                )}
              </div>
              <div className="p-6">
                <Badge className="mb-3 bg-secondary text-white">
                  {selectedImage.category}
                </Badge>
                <h2 className="text-2xl font-bold text-primary mb-3">
                  {selectedImage.title}
                </h2>
                <p className="text-foreground/80">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's transform your home with the same quality craftsmanship showcased in our gallery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              Get Free Estimate
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
              Call (201) 637-4345
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
