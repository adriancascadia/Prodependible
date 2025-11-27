import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Images, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

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
    title: "Deck Enhancement",
    category: "Deck",
    image: "/gallery/gallery-deck.jpg",
    description: "Complete deck transformation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 2,
    title: "Full Deck Reconstruction",
    category: "Deck",
    image: "/gallery/gallery-deckfull.jpg",
    description: "Complete deck reconstruction with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 3,
    title: "Enclosure Installation",
    category: "Enclosure",
    image: "/gallery/gallery-enclosure.jpg",
    description: "Complete enclosure installation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 4,
    title: "Stair Replacement + Structural Repair",
    category: "Stairs",
    image: "/gallery/gallery-stairs.jpg",
    description: "Complete stair replacement and structural repair with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 5,
    title: "Patio Door Installation",
    category: "Patio",
    image: "/gallery/gallery-patio.jpg",
    description: "Complete patio door installation with custom cabinets, quartz countertops, and modern appliances."
  },
  {
    id: 6,
    title: "Custom Entry Deck",
    category: "Deck",
    image: "/gallery/gallery-entrydeck.jpg",
    description: "Complete entry deck installation with custom cabinets, quartz countertops, and modern appliances."
  }
];

const categories = ["All", "Deck", "Enclosure", "Stairs", "Patio", "Carpentry"];

export default function Gallery() {
  const { t } = useLanguage();
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
                    {t('gallery.zoomOut')}
                  </div>
                )}
                {!isZoomed && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm z-10">
                    {t('gallery.zoomIn')}
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
