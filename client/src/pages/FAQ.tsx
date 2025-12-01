import { useState, useEffect } from "react";
import { getFAQPageSchema, injectSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, HelpCircle, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import { getLocalBusinessSchema } from "@/lib/schema";


interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const schema = getLocalBusinessSchema();
  const businessEmail = schema.email || "prodependable@gmail.com";
  const businessPhone = schema.phone || "+12016374343";
  

  useEffect(() => {
    fetch('/faq-data.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading FAQ data:', err);
        setLoading(false);
      });
  }, []);

  // Inject FAQPage schema for SEO - MUST be before any conditional returns
  const faqs: FAQItem[] = data ? data.categories.flatMap((cat: any) => 
    cat.questions.map((q: any) => ({
      question: q.question,
      answer: q.answer,
      category: cat.name
    }))
  ) : [
    {
      category: "Getting Started",
      question: "How do I get a quote for my project?",
      answer: "Getting a quote is easy! You can call us at (201) 637-4343, fill out our online contact form, or request an estimate through our website. We'll schedule a free consultation to discuss your project, take measurements, and provide a detailed written estimate within 24-48 hours."
    },
    {
      category: "Getting Started",
      question: "Do you offer free estimates?",
      answer: "Yes! We provide free, no-obligation estimates for all projects. During the consultation, we'll discuss your vision, assess the scope of work, and provide honest recommendations. There's never any pressure to commit."
    },
    {
      category: "Getting Started",
      question: "What areas do you serve?",
      answer: "We primarily serve Bergen County and Passaic County. We're based in Northern New Jersey and typically work approximately 15 miles radius from Paramus, NJ. If you're outside this area, give us a call—we may be able to accommodate your project."
    },
    {
      category: "Services & Pricing",
      question: "What types of projects do you handle?",
      answer: "We handle a wide range of home improvement projects including handyman services, carpentry, painting (interior and exterior), flooring installation and kitchen renovations, deck building and repair, drywall work, and general contracting. If you have a specific project in mind, just ask!"
    },
    {
      category: "Services & Pricing",
      question: "Do you work on both residential and commercial properties?",
      answer: "Yes, we work on both residential homes and commercial properties. Our team has experience with single-family homes, multi-family buildings, condos, and small commercial spaces."
    },
    {
      category: "Services & Pricing",
      question: "What is your pricing structure?",
      answer: "Pricing varies based on project scope, materials, and complexity. We provide detailed written estimates that break down labor and materials costs. We believe in transparent pricing with no hidden fees. For smaller projects, we can provide hourly rates. Larger renovations are typically quoted as fixed-price contracts."
    },
    {
      category: "Services & Pricing",
      question: "Do you help with material selection?",
      answer: "Absolutely! We can guide you through material selection, recommend quality products within your budget, and even accompany you to suppliers if needed. Our experience helps clients make informed decisions that balance quality, aesthetics, and cost."
    },
    {
      category: "Project Timeline",
      question: "How long will my project take?",
      answer: "Timeline depends on project size and complexity. Small handyman tasks may take a few hours to a day. Bathroom renovations typically take 2-4 weeks. Kitchen remodels can take 4-8 weeks. We provide realistic timelines in our estimates and keep you updated throughout the project."
    },
    {
      category: "Project Timeline",
      question: "How far in advance should I schedule?",
      answer: "We recommend scheduling 2-4 weeks in advance for larger projects, though we can often accommodate urgent repairs sooner. During peak season (spring and summer), booking earlier ensures your preferred timeline."
    },
    {
      category: "Project Timeline",
      question: "What if the project takes longer than expected?",
      answer: "We build realistic timelines into our estimates and communicate proactively if unexpected issues arise. If delays occur due to unforeseen circumstances (hidden damage, weather, material delays), we'll explain the situation and revised timeline immediately."
    },
    {
      category: "Licensing & Insurance",
      question: "Are you licensed and insured?",
      answer: "Yes, we are fully licensed and insured in New Jersey. We carry general liability insurance and workers' compensation coverage to protect both our team and your property. We're happy to provide proof of insurance upon request."
    },
    {
      category: "Licensing & Insurance",
      question: "Do you handle permits?",
      answer: "Yes, we handle all necessary permits for your project. We're familiar with local building codes and requirements in our service area. Permit costs are typically outlined separately in your estimate."
    },
    {
      category: "Licensing & Insurance",
      question: "What warranties do you offer?",
      answer: "We stand behind our work with a one-year workmanship warranty on most projects. Materials come with manufacturer warranties, which we'll explain during the estimate. If any issues arise from our work, we'll make it right."
    },
    {
      category: "Payment & Contracts",
      question: "What payment methods do you accept?",
      answer: "We accept Cash, Check, Zelle, Venmo and PayPal payments. For larger projects, we typically work on a payment schedule tied to project milestones rather than requiring full payment upfront."
    },
    {
      category: "Payment & Contracts",
      question: "Do you require a deposit?",
      answer: "For larger projects, we typically request a deposit (usually 25-30%) to secure your spot on our schedule and purchase materials. The remaining balance is paid according to the payment schedule outlined in your contract."
    },
    {
      category: "Payment & Contracts",
      question: "What's included in the contract?",
      answer: "Our contracts include detailed scope of work, materials specifications, timeline, payment schedule, warranty information, and terms and conditions. Everything is clearly documented in writing before work begins."
    },
    {
      category: "During the Project",
      question: "Will the same crew work on my project throughout?",
      answer: "Yes, we assign dedicated crews to projects for consistency and quality. You'll work with the same team members from start to finish, building familiarity and trust."
    },
    {
      category: "During the Project",
      question: "How do you handle cleanup?",
      answer: "We maintain clean, safe work areas throughout the project and perform thorough cleanup at the end of each day. Final cleanup is included in all our projects—we leave your home cleaner than we found it."
    },
    {
      category: "During the Project",
      question: "What if I want to make changes during the project?",
      answer: "Changes happen! If you want to modify the scope during the project, we'll discuss the impact on timeline and cost, provide a change order for your approval, and document everything in writing before proceeding."
    },
    {
      category: "Communication",
      question: "How do you communicate during the project?",
      answer: "We believe in proactive communication. You'll have direct contact with your project lead, and we provide regular updates on progress. We're available by phone, text, or email and respond promptly to questions or concerns."
    },
    {
      category: "Communication",
      question: "What if I have a problem or concern?",
      answer: "We want to know immediately if you have any concerns. Contact us by phone at (201) 637-4345 or email, and we'll address issues promptly. Your satisfaction is our priority, and we're committed to making things right."
    }
  ];

  const categories = data ? data.categories.map((cat: any) => cat.name) : [];

  // Inject FAQPage schema for SEO - MUST be before conditional returns
  useEffect(() => {
    const schema = getFAQPageSchema(faqs);
    const cleanup = injectSchema(schema);
    return cleanup;
  }, [faqs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <HelpCircle className="h-5 w-5 mr-2 inline" />
              We're Here to Help
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our services, process, and what to expect when working with us.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {categories.map((category: string, catIdx: number) => (
            <div key={catIdx} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6 pb-3 border-b-2 border-secondary">
                {category}
              </h2>
              
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, idx) => {
                    const globalIdx = faqs.findIndex(f => f === faq);
                    const isOpen = openIndex === globalIdx;
                    
                    return (
                      <Card 
                        key={idx}
                        className={`border-2 transition-all duration-300 ${
                          isOpen ? 'border-secondary shadow-lg' : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        <CardContent className="p-0">
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                            className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                          >
                            <h3 className="text-lg font-bold text-primary pr-4">
                              {faq.question}
                            </h3>
                            <ChevronDown 
                              className={`h-6 w-6 text-secondary flex-shrink-0 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-6 pt-2 border-t">
                              <p className="text-foreground/90 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-gradient-to-br from-secondary via-accent to-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-primary/80 mb-10">
              We're here to help! Contact us and we'll be happy to answer any questions you have.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a href="tel:2016374345">
                <Card className="hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Call Us</h3>
                    <p className="text-2xl font-bold text-primary">{businessPhone}</p>
                    <p className="text-sm text-muted-foreground mt-2">Mon-Sat, 8AM-6PM</p>
                  </CardContent>
                </Card>
              </a>
              
              <Link href="/#contact">
                <Card className="hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Get Estimate</h3>
                    <p className="text-lg text-primary/80">Fill out our contact form</p>
                    <p className="text-sm text-muted-foreground mt-2">Response within 24 hours</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
