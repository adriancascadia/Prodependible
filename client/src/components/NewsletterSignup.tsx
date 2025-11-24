import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // In a real implementation, this would send to a backend/email service
    console.log("Newsletter signup:", email);
    
    toast.success("Thank you for subscribing!");
    setIsSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-primary" />
        <h3 className="font-serif text-xl font-bold text-primary">
          Stay Updated
        </h3>
      </div>
      <p className="text-gray-700 mb-4">
        Get home improvement tips, seasonal maintenance reminders, and exclusive offers delivered to your inbox.
      </p>
      
      {isSubmitted ? (
        <div className="bg-white rounded-lg p-4 flex items-center gap-3 text-green-700">
          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">Successfully subscribed!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-primary/20 rounded-lg focus:outline-none focus:border-secondary"
            required
          />
          <Button
            type="submit"
            className="bg-secondary hover:bg-secondary/90 text-primary font-semibold whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      )}
      <p className="text-xs text-gray-500 mt-3">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
