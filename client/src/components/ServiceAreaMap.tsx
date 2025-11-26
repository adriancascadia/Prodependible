import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2 } from "lucide-react";

export default function ServiceAreaMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const centerLocation = { lat: 40.8448, lng: -74.0060 }; // Bergen County, NJ area
  const serviceRadius = 40000; // 40km radius

  const handleMapReady = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);

    // Add service radius circle
    const circle = new google.maps.Circle({
      strokeColor: "#D4AF37",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#D4AF37",
      fillOpacity: 0.15,
      map: mapInstance,
      center: centerLocation,
      radius: serviceRadius,
    });

    circleRef.current = circle;

    // Add center marker
    new google.maps.Marker({
      position: centerLocation,
      map: mapInstance,
      title: "Dependable Home Improvement",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#D4AF37",
        fillOpacity: 1,
        strokeColor: "#2C3E50",
        strokeWeight: 3,
      },
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; font-family: system-ui;">
          <h3 style="margin: 0 0 8px 0; color: #2C3E50; font-size: 16px; font-weight: bold;">
            Dependable Home Improvement
          </h3>
          <p style="margin: 0; color: #666; font-size: 14px;">
            Serving Bergen County & Surrounding Areas
          </p>
          <p style="margin: 8px 0 0 0; color: #D4AF37; font-size: 13px; font-weight: 600;">
            📞 (201) 637-4345
          </p>
        </div>
      `,
      position: centerLocation,
    });

    infoWindow.open(mapInstance);
  };

  const serviceAreas = [
    "Bergen County",
    "Passaic County"
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Map */}
        <Card className="overflow-hidden border-2 border-secondary/20 shadow-2xl">
          <div className="h-[500px] w-full">
            <MapView
              onMapReady={handleMapReady}
              initialCenter={centerLocation}
              initialZoom={10}
            />
          </div>
        </Card>

        {/* Service Areas List */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary px-4 py-2">
              <MapPin className="h-4 w-4 mr-2 inline" />
              Coverage Area
            </Badge>
            <h3 className="text-3xl font-bold text-primary mb-4">
              We Serve Your Area
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team proudly serves homes and businesses throughout Northern New Jersey and nearby regions. 
              With over 20 years of local experience, we understand the unique needs of properties in our service area.
            </p>
          </div>

          <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-2xl p-6 border-2 border-secondary/10">
            <h4 className="text-xl font-bold text-primary mb-4">Primary Service Areas:</h4>
            <ul className="space-y-3">
              {serviceAreas.map((area, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-base text-foreground">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-primary text-white border-0">
            <div className="p-6">
              <h4 className="text-xl font-bold mb-3">Not sure if we serve your area?</h4>
              <p className="text-white/90 mb-4">
                Give us a call! We often accommodate projects outside our typical service radius for the right fit.
              </p>
              <a 
                href="tel:2016374345" 
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                <MapPin className="h-5 w-5" />
                (201) 637-4343
              </a>
            </div>
          </Card>
        </div>
      </div>

      <div className="text-center bg-muted/30 rounded-2xl p-8">
        <p className="text-lg text-muted-foreground">
          <span className="font-bold text-primary">Service Radius:</span> Approximately 15 miles from Bergen County, NJ
        </p>
      </div>
    </div>
  );
}
