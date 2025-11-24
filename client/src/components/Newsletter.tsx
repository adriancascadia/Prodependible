import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // In a real implementation, this would send to your email service
    console.log("Newsletter signup:", email);
    toast.success("Thank you for subscribing! Check your email for confirmation.");
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-secondary/20 text-center">
        <CheckCircle2 className="h-16 w-16 text-secondary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-2">You're Subscribed!</h3>
        <p className="text-muted-foreground">
          Thank you for joining our newsletter. We'll keep you updated with home improvement tips and special offers.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Get Home Improvement Tips</h3>
          <p className="text-white/90">
            Subscribe to our newsletter for exclusive tips, seasonal maintenance guides, and special offers.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-shrink-0 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-primary h-12 md:w-64"
            />
            <Button 
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-primary h-12 px-8 font-bold whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-white/70 mt-2">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
