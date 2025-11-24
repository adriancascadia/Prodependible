import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import Breadcrumb from "@/components/Breadcrumb";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thank you! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Phone className="h-5 w-5 mr-2 inline" />
              Get In Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90">
              Ready to start your project? Get a free estimate and experience the Dependable difference.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-border">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-6">Request a Free Estimate</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="border-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="border-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(201) 555-0123"
                          className="border-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">
                          Service Needed *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full border-2 border-input bg-background px-3 py-2 rounded-md text-sm"
                        >
                          <option value="">Select a service...</option>
                          <option value="andersen-windows">Andersen Doors & Windows</option>
                          <option value="handyman">Handyman Services</option>
                          <option value="carpentry">Carpentry & Woodwork</option>
                          <option value="painting">Painting Services</option>
                          <option value="renovation">Full Renovations</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        rows={6}
                        className="border-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <a href="tel:+12016374345" className="text-primary hover:text-secondary transition-colors">
                          (201) 637-4345
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <a href="mailto:info@prodependable.com" className="text-primary hover:text-secondary transition-colors">
                          info@prodependable.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Service Area</p>
                        <p className="text-foreground/80">Bergen County, NJ & Surrounding Areas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Business Hours</p>
                        <p className="text-foreground/80">Mon-Fri: 7:00 AM - 6:00 PM</p>
                        <p className="text-foreground/80">Sat: 8:00 AM - 4:00 PM</p>
                        <p className="text-foreground/80">Sun: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary bg-secondary/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Emergency Services</h3>
                  <p className="text-foreground/90 mb-4">
                    Need urgent repairs? We offer emergency services for critical issues.
                  </p>
                  <Button variant="outline" className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Emergency
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">Licensed & Insured</h3>
                  <div className="space-y-2 text-sm text-foreground/90">
                    <p>✓ NJ Home Improvement License</p>
                    <p>✓ General Liability Insurance</p>
                    <p>✓ Workers' Compensation Insurance</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
