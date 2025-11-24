export default function FontComparison() {
  const fonts = [
    { name: "Playfair Display", family: "'Playfair Display', serif", description: "Current - Elegant serif with wide spacing" },
    { name: "Montserrat", family: "'Montserrat', sans-serif", description: "Modern, professional sans-serif" },
    { name: "Merriweather", family: "'Merriweather', serif", description: "Classic, readable serif" },
    { name: "Lora", family: "'Lora', serif", description: "Elegant, balanced serif" },
    { name: "Raleway", family: "'Raleway', sans-serif", description: "Elegant, clean sans-serif" },
    { name: "Crimson Text", family: "'Crimson Text', serif", description: "Refined, compact serif" },
    { name: "Poppins", family: "'Poppins', sans-serif", description: "Friendly, modern sans-serif" },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Font Comparison</h1>
        <p className="text-center text-muted-foreground mb-12">
          Compare different premium fonts for the website headings
        </p>

        <div className="space-y-12">
          {fonts.map((font) => (
            <div key={font.name} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary mb-2">{font.name}</h3>
                <p className="text-sm text-muted-foreground">{font.description}</p>
              </div>
              
              <div className="space-y-6">
                {/* Large Heading */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Large Heading (Hero)</p>
                  <h2 
                    className="text-6xl font-bold leading-tight"
                    style={{ fontFamily: font.family }}
                  >
                    Crafting Excellence,<br />
                    <span className="text-secondary">Building Trust</span>
                  </h2>
                </div>

                {/* Medium Heading */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Medium Heading (Section)</p>
                  <h3 
                    className="text-4xl font-bold"
                    style={{ fontFamily: font.family }}
                  >
                    Premium Services
                  </h3>
                </div>

                {/* Small Heading */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Small Heading (Card)</p>
                  <h4 
                    className="text-2xl font-bold"
                    style={{ fontFamily: font.family }}
                  >
                    Handyman Services
                  </h4>
                </div>

                {/* Body Text Sample */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Body Text</p>
                  <p className="text-base" style={{ fontFamily: font.family }}>
                    Transform your property with 30+ years of masterful craftsmanship and unwavering dedication. 
                    We provide comprehensive home improvement solutions delivered with expertise and integrity.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
