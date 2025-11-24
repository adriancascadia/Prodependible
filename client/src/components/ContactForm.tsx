import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, ArrowRight, ArrowLeft, User, Phone, Mail, 
  Home, Calendar, DollarSign, MessageSquare 
} from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    serviceType: "",
    timeline: "",
    budget: "",
    message: ""
  });

  const totalSteps = 4;

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.email || !formData.phone) {
          toast.error("Please fill in all contact information");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        break;
      case 2:
        if (!formData.propertyType || !formData.serviceType) {
          toast.error("Please select property and service type");
          return false;
        }
        break;
      case 3:
        if (!formData.timeline || !formData.budget) {
          toast.error("Please select timeline and budget");
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      toast.success("Thank you! We'll contact you within 24 hours.");
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        serviceType: "",
        timeline: "",
        budget: "",
        message: ""
      });
      setStep(1);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto border-2 border-secondary/20 shadow-2xl">
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s < step 
                    ? "bg-secondary text-primary" 
                    : s === step 
                    ? "bg-gradient-to-r from-secondary to-accent text-primary ring-4 ring-secondary/20" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {s < step ? <CheckCircle2 className="h-6 w-6" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    s < step ? "bg-secondary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <User className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary mb-2">Contact Information</h3>
                <p className="text-muted-foreground">Let's start with your details</p>
              </div>

              <div>
                <Label htmlFor="name" className="text-base font-semibold">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="John Doe"
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="john@example.com"
                  className="mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="(201) 555-0123"
                  className="mt-2 h-12 text-base"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Home className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary mb-2">Project Details</h3>
                <p className="text-muted-foreground">Tell us about your property</p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Property Type *</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Residential", "Commercial", "Multi-Family", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("propertyType", type)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.propertyType === type
                          ? "border-secondary bg-secondary/10 text-primary"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Service Needed *</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Handyman", "Carpentry", "Painting", "Full Renovation", "Flooring", "Other"].map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => updateField("serviceType", service)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.serviceType === service
                          ? "border-secondary bg-secondary/10 text-primary"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Timeline & Budget */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Calendar className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary mb-2">Timeline & Budget</h3>
                <p className="text-muted-foreground">Help us plan your project</p>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Project Timeline *</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["ASAP", "Within 1 Month", "1-3 Months", "3+ Months", "Just Exploring"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => updateField("timeline", time)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.timeline === time
                          ? "border-secondary bg-secondary/10 text-primary"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Budget Range *</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Under $5K", "$5K - $15K", "$15K - $30K", "$30K - $50K", "$50K+", "Not Sure"].map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => updateField("budget", budget)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        formData.budget === budget
                          ? "border-secondary bg-secondary/10 text-primary"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Additional Details */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <MessageSquare className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary mb-2">Additional Details</h3>
                <p className="text-muted-foreground">Any specific requirements?</p>
              </div>

              <div>
                <Label htmlFor="message" className="text-base font-semibold">Project Description (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                  className="mt-2 min-h-[150px] text-base"
                />
              </div>

              <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                <h4 className="font-bold text-primary mb-3">Your Information Summary:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> <span className="font-semibold">{formData.name}</span></div>
                  <div><span className="text-muted-foreground">Phone:</span> <span className="font-semibold">{formData.phone}</span></div>
                  <div><span className="text-muted-foreground">Property:</span> <span className="font-semibold">{formData.propertyType}</span></div>
                  <div><span className="text-muted-foreground">Service:</span> <span className="font-semibold">{formData.serviceType}</span></div>
                  <div><span className="text-muted-foreground">Timeline:</span> <span className="font-semibold">{formData.timeline}</span></div>
                  <div><span className="text-muted-foreground">Budget:</span> <span className="font-semibold">{formData.budget}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="px-8 py-6 text-base"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
            )}
            
            {step < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary px-8 py-6 text-base font-bold ml-auto"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary px-8 py-6 text-base font-bold ml-auto"
              >
                Submit Request
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
