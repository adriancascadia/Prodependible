import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Images, X, ZoomIn, ZoomOut, ArrowLeft, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryImage {
  src: string;
  label?: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  images: GalleryImage[];
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Deck Enhancement",
    category: "Deck",
    images: [
      { src: "/gallery/deck-enhancement-before.jpg", label: "Before" },
      { src: "/gallery/deck-enhancement-after.jpg", label: "After" },
      { src: "/gallery/deck-enhancement2-before.jpg", label: "Before" },
      { src: "/gallery/deck-enhancement2-after.png", label: "After" }
    ],
    description: "Complete deck transformation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 2,
    title: "Full Deck Reconstruction",
    category: "Deck",
    images: [
      { src: "/gallery/deck-reconstruction-before.jpg", label: "Before" },
      { src: "/gallery/deck-reconstruction-after.webp", label: "After" }
    ],
    description: "Complete deck reconstruction with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 3,
    title: "Enclosure Installation",
    category: "Enclosure",
    images: [
      { src: "/gallery/enclosure-before.jpg", label: "Before" },
      { src: "/gallery/enclosure-after.webp", label: "After" }
    ],
    description: "Complete enclosure installation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 4,
    title: "Stair Replacement + Structural Repair",
    category: "Stairs",
    images: [
      { src: "/gallery/stair-before.png", label: "Before" },
      { src: "/gallery/stair-after.png", label: "After" }
    ],
    description: "Complete stair replacement and structural repair with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 5,
    title: "Patio Door Installation",
    category: "Patio",
    images: [
      { src: "/gallery/patio-door-before.jpg", label: "Before" },
      { src: "/gallery/patio-door-after.jpg", label: "After" }
    ],
    description: "Complete patio door installation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 6,
    title: "Custom Entry Deck",
    category: "Deck",
    images: [
      { src: "/gallery/entrydeck-before.jpg", label: "Before" },
      { src: "/gallery/entrydeck-after.webp", label: "After" }
    ],
    description: "Complete entry deck installation with custom cabinets, quartz countertops, and modern appliances."
  }
];

const categories = ["All", "Deck", "Enclosure", "Stairs", "Patio", "Carpentry"];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isZoomed, setIsZoomed] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  // Flatten images for the lightbox so we can slide through ALL images
  // We need to keep track of which project they belong to
  const flattenedImages = galleryItems.flatMap(item => 
    item.images.map(img => ({ ...img, ...item }))
  );
  
  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const filteredFlattenedImages = filteredItems.flatMap(item => 
    item.images.map(img => ({ ...img, ...item }))
  );

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  // Calculate category counts
  const getCategoryCount = (category: string) => {
    if (category === "All") return galleryItems.length;
    return galleryItems.filter(item => item.category === category).length;
  };

  // Sync carousel with selected image
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      // Optional: sync logic
    });
  }, [api]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: t('nav.gallery') }]} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Images className="h-5 w-5 mr-2 inline" />
              {t('gallery.button')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('gallery.title')}</h1>
            <p className="text-xl text-white/90">
              {t('gallery.subtitle')}
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
                className="group"
              >
                <Carousel className="w-full">
                  <CarouselContent>
                    {item.images.map((image, imgIndex) => (
                      <CarouselItem key={imgIndex}>
                        <div 
                          className="relative overflow-hidden rounded-lg border-2 border-border hover:border-secondary transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                          onClick={() => {
                             // Find the index of this specific image in the flattened list
                             const globalIndex = filteredFlattenedImages.findIndex(img => img.src === image.src);
                             if (globalIndex !== -1) setSelectedImageIndex(globalIndex);
                          }}
                        >
                          {!loadedImages.has(image.src) && (
                            <Skeleton className="absolute inset-0 w-full h-64" />
                          )}
                          <img
                            src={image.src}
                            alt={`${item.title} - ${image.label || ''}`}
                            className={`w-full h-64 object-cover transition-opacity duration-300 ${!loadedImages.has(image.src) ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => handleImageLoad(image.src)}
                          />
                          
                          {/* Label Badge (Before/After) */}
                          {image.label && (
                            <div className="absolute top-4 left-4 z-10">
                              <Badge className={`${image.label === 'Before' ? 'bg-yellow-500' : 'bg-green-500'} text-white border-none`}>
                                {image.label}
                              </Badge>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-6 text-white">
                              <Badge className="mb-2 bg-secondary text-white">
                                {item.category}
                              </Badge>
                              <h3 className="text-xl font-bold">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Navigation Arrows for Grid Item */}
                  {item.images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none h-8 w-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none h-8 w-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </Carousel>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-foreground/70 mt-1">{item.description}</p>
                </div>
              </div>              
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Slider Modal */}
      <Dialog 
        open={selectedImageIndex !== null} 
        onOpenChange={(open) => { 
          if (!open) {
            setSelectedImageIndex(null); 
            setIsZoomed(false); 
          }
        }}
      >
        <DialogContent className="max-w-6xl p-0 bg-black/95 border-none text-white h-[90vh] flex flex-col">
          <VisuallyHidden>
            <DialogTitle>Gallery Lightbox</DialogTitle>
          </VisuallyHidden>
          
          <div className="relative flex-1 min-h-0 flex items-center justify-center">
             <Carousel 
                setApi={setApi}
                className="w-full h-full"
                opts={{
                  startIndex: selectedImageIndex || 0,
                  loop: true,
                }}
              >
                <CarouselContent className="h-full">
                  {filteredFlattenedImages.map((img, idx) => (
                    <CarouselItem key={`${img.id}-${idx}`} className="h-full flex items-center justify-center relative">
                       <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.title}
                            className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                            }`}
                            onClick={() => setIsZoomed(!isZoomed)}
                            style={{
                              transform: isZoomed ? 'scale(2)' : 'scale(1)',
                            }}
                          />
                       </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-black/50 border-none hover:bg-black/80 text-white" />
                <CarouselNext className="right-4 bg-black/50 border-none hover:bg-black/80 text-white" />
              </Carousel>

              {/* Controls Overlay */}
              <div className="absolute top-4 right-4 z-50 flex gap-2">
                 <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={() => { setSelectedImageIndex(null); setIsZoomed(false); }}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
          </div>

          {/* Caption/Info Footer */}
          {selectedImageIndex !== null && filteredFlattenedImages[selectedImageIndex] && (
             <div className="p-6 bg-black/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                   <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-secondary text-primary">
                        {filteredFlattenedImages[selectedImageIndex].category}
                      </Badge>
                      {filteredFlattenedImages[selectedImageIndex].label && (
                        <Badge variant="outline" className="text-white border-white">
                          {filteredFlattenedImages[selectedImageIndex].label}
                        </Badge>
                      )}
                      <span className="text-white/60 text-sm">
                        {selectedImageIndex + 1} / {filteredFlattenedImages.length}
                      </span>
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2">
                      {filteredFlattenedImages[selectedImageIndex].title}
                   </h2>
                   <p className="text-white/80">
                      {filteredFlattenedImages[selectedImageIndex].description}
                   </p>
                </div>
             </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('gallery.cta.title')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('gallery.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              {t('hero.cta')}
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
              {t('hero.call')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
