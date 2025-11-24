import { Download, FileText, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  downloadUrl: string;
  preview: string;
}

const resources: Resource[] = [
  {
    id: "home-maintenance-checklist",
    title: "Seasonal Home Maintenance Checklist",
    description: "A comprehensive guide to maintaining your home throughout the year. Includes spring, summer, fall, and winter maintenance tasks to keep your home in top condition.",
    category: "Maintenance",
    pages: 6,
    downloadUrl: "/resources/home-maintenance-checklist.pdf",
    preview: "Monthly and seasonal tasks, HVAC maintenance, gutter cleaning, weatherproofing, and more."
  },
  {
    id: "kitchen-remodeling-guide",
    title: "Kitchen Remodeling Planning Guide",
    description: "Everything you need to know before starting your kitchen renovation. From layout planning to material selection and budgeting.",
    category: "Planning",
    pages: 12,
    downloadUrl: "/resources/kitchen-remodeling-guide.pdf",
    preview: "Layout options, cabinet styles, countertop materials, appliance selection, lighting design, and budget worksheets."
  },
  {
    id: "bathroom-renovation-checklist",
    title: "Bathroom Renovation Checklist",
    description: "Step-by-step checklist for planning and executing a successful bathroom renovation project.",
    category: "Planning",
    pages: 8,
    downloadUrl: "/resources/bathroom-renovation-checklist.pdf",
    preview: "Design decisions, fixture selection, tile choices, ventilation requirements, and timeline planning."
  },
  {
    id: "project-budget-worksheet",
    title: "Home Improvement Budget Worksheet",
    description: "Detailed worksheet to help you plan and track your home improvement project budget, including contingency planning.",
    category: "Budgeting",
    pages: 4,
    downloadUrl: "/resources/project-budget-worksheet.pdf",
    preview: "Cost categories, material estimates, labor costs, permit fees, contingency planning, and payment schedule."
  },
  {
    id: "contractor-selection-guide",
    title: "How to Choose the Right Contractor",
    description: "Essential questions to ask and red flags to watch for when selecting a home improvement contractor.",
    category: "Planning",
    pages: 5,
    downloadUrl: "/resources/contractor-selection-guide.pdf",
    preview: "Licensing verification, insurance requirements, reference checks, contract essentials, and warning signs."
  },
  {
    id: "winter-home-prep",
    title: "Winter Home Preparation Guide",
    description: "Protect your home from winter weather with this comprehensive preparation checklist.",
    category: "Maintenance",
    pages: 7,
    downloadUrl: "/resources/winter-home-prep.pdf",
    preview: "Insulation tips, pipe protection, heating system maintenance, roof and gutter care, and emergency preparedness."
  }
];

export default function Resources() {
  const [email, setEmail] = useState("");
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const handleDownload = (resource: Resource) => {
    if (!email) {
      setSelectedResource(resource.id);
      toast.error("Please enter your email to download");
      return;
    }

    // In a real implementation, this would send the email to a backend
    toast.success(`Download link sent to ${email}!`);
    
    // Simulate download
    setTimeout(() => {
      toast.info(`Downloading: ${resource.title}`);
    }, 1000);

    setSelectedResource(null);
  };

  const categories = Array.from(new Set(resources.map(r => r.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'Resources' }]} />
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Free Home Improvement Resources
            </h1>
            <p className="text-xl text-cream/90 leading-relaxed">
              Download our comprehensive guides, checklists, and worksheets to help you plan and execute your home improvement projects successfully.
            </p>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-12 bg-white border-b-2 border-secondary/20">
        <div className="container max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">
            Get Instant Access to All Resources
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email once to download any of our free guides and receive home improvement tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-secondary flex-1 max-w-md"
            />
            <Button
              onClick={() => email && toast.success("Email saved! You can now download any resource.")}
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Save Email
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container">
          {categories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 pb-3 border-b-2 border-secondary">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources
                  .filter((r) => r.category === category)
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        selectedResource === resource.id
                          ? "border-secondary ring-4 ring-secondary/20"
                          : "border-primary/10"
                      }`}
                    >
                      <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                        <FileText className="w-12 h-12 mb-4 text-secondary" />
                        <h3 className="font-serif text-xl font-bold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-cream/80">
                          {resource.pages} pages • PDF Format
                        </p>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {resource.description}
                        </p>
                        <div className="bg-cream/50 p-4 rounded-lg mb-6">
                          <p className="text-sm text-gray-600 font-medium mb-2">
                            What's Inside:
                          </p>
                          <p className="text-sm text-gray-700">
                            {resource.preview}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleDownload(resource)}
                          className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download Free PDF
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
            Why Download Our Resources?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">Expert Knowledge</h3>
                <p className="text-gray-700">
                  Created by professionals with 30+ years of home improvement experience.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">Save Money</h3>
                <p className="text-gray-700">
                  Avoid costly mistakes with proper planning and budgeting tools.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">Save Time</h3>
                <p className="text-gray-700">
                  Streamline your project with organized checklists and timelines.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">Make Informed Decisions</h3>
                <p className="text-gray-700">
                  Understand your options and choose the best solutions for your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-cream/90 mb-8">
            Get a free consultation and estimate from Bergen County's most trusted home improvement contractor.
          </p>
          <Button
            onClick={() => window.location.href = "/#contact"}
            className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg"
          >
            Request Free Estimate
          </Button>
        </div>
      </section>
    </div>
  );
}
