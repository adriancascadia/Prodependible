import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, title, category }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="group">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none border-4 border-white/20 hover:border-secondary/50 transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onClick={handleClick}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={`${title} - After`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-6 right-6 bg-gradient-to-r from-secondary to-accent text-primary px-6 py-3 rounded-xl font-bold shadow-2xl text-lg">
            AFTER
          </div>
        </div>

        {/* Before Image (Overlay with clip) */}
        <div
          className="absolute inset-0 transition-all duration-100"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={`${title} - Before`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-6 left-6 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-2xl text-lg">
            BEFORE
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl transition-all duration-100"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white rounded-full p-3 shadow-2xl flex items-center gap-0 border-4 border-secondary">
              <ChevronLeft className="h-6 w-6 text-primary" />
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Instruction overlay */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Drag or click to compare
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-bold mb-3">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
      </div>
    </div>
  );
}
