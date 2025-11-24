interface ProjectCardProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category: string;
}

export default function ProjectCard({ beforeImage, afterImage, title, category }: ProjectCardProps) {
  return (
    <div className="group">
      <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Before Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute top-3 left-3 z-10 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
            BEFORE
          </div>
          <img
            src={beforeImage}
            alt={`${title} - Before`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* After Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute top-3 right-3 z-10 bg-secondary/90 text-white px-3 py-1 rounded-md text-sm font-semibold">
            AFTER
          </div>
          <img
            src={afterImage}
            alt={`${title} - After`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      
      {/* Project Info */}
      <div className="text-center">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-secondary font-medium">
          {category}
        </p>
      </div>
    </div>
  );
}
