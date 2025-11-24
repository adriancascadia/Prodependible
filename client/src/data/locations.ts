export interface LocationData {
  name: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  testimonial: {
    name: string;
    text: string;
    project: string;
  };
  zipCodes: string[];
  nearbyAreas: string[];
}

export const locations: LocationData[] = [
  {
    name: "Hackensack",
    slug: "hackensack",
    title: "Professional Home Improvement Services in Hackensack, NJ",
    description: "Dependable Home Improvement has been serving Hackensack residents since 2004 with expert carpentry, painting, and renovation services. As the county seat of Bergen County, Hackensack's diverse housing stock—from historic Victorian homes to modern condominiums—requires skilled craftsmanship and attention to detail.",
    features: [
      "Historic home restoration and modernization",
      "Condo and apartment interior renovations",
      "Kitchen and bathroom remodeling",
      "Deck refinishing and patio door installation",
      "Basement finishing for growing families"
    ],
    testimonial: {
      name: "Michael R.",
      text: "Dependable transformed our 1920s Hackensack home while preserving its character. Their attention to period-appropriate details was exceptional.",
      project: "Historic Home Kitchen Renovation"
    },
    zipCodes: ["07601", "07602"],
    nearbyAreas: ["River Edge", "Teaneck", "Bogota", "South Hackensack"]
  },
  {
    name: "Teaneck",
    slug: "teaneck",
    title: "Trusted Home Renovation Experts in Teaneck, NJ",
    description: "Teaneck's vibrant, diverse community deserves home improvement services that understand the unique character of this historic township. Dependable Home Improvement brings 20+ years of experience to Teaneck's colonial, cape cod, and ranch-style homes.",
    features: [
      "Whole-house renovations for growing families",
      "Accessible bathroom modifications",
      "Energy-efficient window and door replacement",
      "Finished basements and home offices",
      "Exterior painting and siding repair"
    ],
    testimonial: {
      name: "Sarah L.",
      text: "We needed our Teaneck home updated for aging in place. Dependable installed grab bars, widened doorways, and created a beautiful accessible bathroom.",
      project: "Accessible Home Modification"
    },
    zipCodes: ["07666"],
    nearbyAreas: ["Bergenfield", "Englewood", "Hackensack", "Bogota"]
  },
  {
    name: "Fort Lee",
    slug: "fort-lee",
    title: "Premium Home Improvement Services in Fort Lee, NJ",
    description: "Fort Lee's luxury high-rise condominiums and historic single-family homes demand exceptional craftsmanship. Dependable Home Improvement specializes in high-end interior renovations that meet the sophisticated standards of Fort Lee residents.",
    features: [
      "Luxury condo interior renovations",
      "Custom kitchen cabinetry and countertops",
      "Spa-quality bathroom remodeling",
      "Hardwood floor installation and refinishing",
      "Crown molding and custom millwork"
    ],
    testimonial: {
      name: "David K.",
      text: "Our Fort Lee condo kitchen renovation exceeded expectations. Dependable coordinated with building management seamlessly and delivered a stunning result.",
      project: "Luxury Condo Kitchen Remodel"
    },
    zipCodes: ["07024"],
    nearbyAreas: ["Edgewater", "Cliffside Park", "Englewood Cliffs", "Leonia"]
  },
  {
    name: "Fair Lawn",
    slug: "fair-lawn",
    title: "Quality Home Renovation Contractors in Fair Lawn, NJ",
    description: "Fair Lawn's family-oriented community and well-maintained neighborhoods reflect homeowners who take pride in their properties. Dependable Home Improvement helps Fair Lawn residents maintain and enhance their homes with professional craftsmanship.",
    features: [
      "Family room additions and expansions",
      "Mudroom and entryway renovations",
      "Garage conversions and storage solutions",
      "Deck construction and outdoor living spaces",
      "Interior and exterior painting"
    ],
    testimonial: {
      name: "Jennifer M.",
      text: "Dependable built us a beautiful deck that's become our family's favorite gathering space. Professional, on-time, and within budget.",
      project: "Custom Deck Construction"
    },
    zipCodes: ["07410"],
    nearbyAreas: ["Paramus", "Glen Rock", "Saddle Brook", "Elmwood Park"]
  },
  {
    name: "Bergenfield",
    slug: "bergenfield",
    title: "Experienced Home Improvement Contractors in Bergenfield, NJ",
    description: "Bergenfield's close-knit community and diverse housing stock require contractors who understand local building codes and neighborhood character. Dependable Home Improvement has served Bergenfield homeowners for over two decades.",
    features: [
      "Roof repair and replacement coordination",
      "Siding installation and repair",
      "Window and door replacement",
      "Basement waterproofing and finishing",
      "Complete home renovations"
    ],
    testimonial: {
      name: "Robert P.",
      text: "After storm damage, Dependable coordinated our insurance claim and restored our Bergenfield home beautifully. True professionals.",
      project: "Storm Damage Restoration"
    },
    zipCodes: ["07621"],
    nearbyAreas: ["Teaneck", "Dumont", "New Milford", "Englewood"]
  },
  {
    name: "Paramus",
    slug: "paramus",
    title: "Professional Home Remodeling Services in Paramus, NJ",
    description: "Paramus homeowners expect excellence, and Dependable Home Improvement delivers with meticulous attention to detail and superior craftsmanship. From split-level renovations to custom carpentry, we enhance Paramus homes with pride.",
    features: [
      "Split-level home modernization",
      "Master suite additions and renovations",
      "Custom closet and storage systems",
      "Kitchen island installation",
      "Fireplace surrounds and built-ins"
    ],
    testimonial: {
      name: "Lisa T.",
      text: "Our Paramus split-level needed a complete update. Dependable's design suggestions and execution were flawless. We love our new home!",
      project: "Whole-House Split-Level Renovation"
    },
    zipCodes: ["07652", "07653"],
    nearbyAreas: ["Ridgewood", "Fair Lawn", "Rochelle Park", "Oradell"]
  },
  {
    name: "Ridgewood",
    slug: "ridgewood",
    title: "High-End Home Renovation Experts in Ridgewood, NJ",
    description: "Ridgewood's prestigious neighborhoods and historic homes demand the highest standards of craftsmanship. Dependable Home Improvement brings expertise in period-appropriate renovations and luxury upgrades to this distinguished community.",
    features: [
      "Historic home preservation and updates",
      "Luxury master bathroom suites",
      "Custom wine cellars and wet bars",
      "Home theater and media room construction",
      "Outdoor kitchen and entertaining spaces"
    ],
    testimonial: {
      name: "Christopher W.",
      text: "Dependable renovated our 1890s Ridgewood Victorian with incredible respect for original details while adding modern conveniences. Exceptional work.",
      project: "Victorian Home Restoration"
    },
    zipCodes: ["07450", "07451"],
    nearbyAreas: ["Glen Rock", "Midland Park", "Ho-Ho-Kus", "Wyckoff"]
  },
  {
    name: "Englewood",
    slug: "englewood",
    title: "Reliable Home Improvement Contractors in Englewood, NJ",
    description: "Englewood's architectural diversity—from Tudor revivals to contemporary designs—requires contractors with broad expertise. Dependable Home Improvement serves Englewood with comprehensive renovation services tailored to each home's unique character.",
    features: [
      "Architectural millwork and trim",
      "Custom staircase renovation",
      "Sunroom and conservatory construction",
      "Home office and library built-ins",
      "Exterior restoration and painting"
    ],
    testimonial: {
      name: "Patricia H.",
      text: "Our Englewood Tudor needed extensive millwork repair. Dependable's craftsmen matched the original details perfectly. Highly recommended.",
      project: "Tudor Revival Millwork Restoration"
    },
    zipCodes: ["07631"],
    nearbyAreas: ["Teaneck", "Fort Lee", "Englewood Cliffs", "Leonia"]
  }
];
