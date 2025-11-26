import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, Users, DollarSign, CheckCircle2, Share2, 
  Phone, Mail, ArrowRight, Copy, Check, Facebook,
  Twitter, Linkedin, MessageCircle, Star, TrendingUp,
  Award, Clock
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function Referrals() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [referralCode, setReferralCode] = useState('');
  const referralLink = referralCode 
    ? `https://prodependable.com/ref/${referralCode}` 
    : "https://prodependable.com/ref/YOUR-CODE";

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const generateReferralCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    // Generate simple code from name
    const code = formData.name.split(' ').map(n => n.substring(0, 3).toUpperCase()).join('');
    setReferralCode(code);
    toast.success("Your referral link is ready!");
  };

  const shareOnSocial = (platform: string) => {
    const message = "Check out Dependable Home Improvement - quality craftsmanship you can trust! Get 10% off your first project: ";
    const url = referralLink;
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white shadow-md border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <img src="/logo-concept3.png" alt="Dependable Home Improvement" className="h-12 w-12" />
              <div>
                <h1 className="text-xl font-bold text-primary">Dependable Home Improvement</h1>
                <p className="text-xs text-secondary font-medium">Est. August 2017 • 30+ Years Experience</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/90 to-accent py-20">
        <div className="absolute inset-0 bg-[url(/hero-background.jpg)] opacity-10 bg-cover bg-center"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white">
              <Gift className="mr-2 h-4 w-4" />
              Referral Program
            </Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Earn Rewards for Sharing Quality
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Refer friends and family to Dependable Home Improvement and earn $100 for every completed project
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to earn rewards while helping others discover quality craftsmanship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="h-8 w-8 text-secondary" />
                </div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold text-xl mb-3">Share Your Link</h3>
                <p className="text-muted-foreground">
                  Share your unique referral link with friends, family, and neighbors who need home improvement services
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold text-xl mb-3">They Get Quality Work</h3>
                <p className="text-muted-foreground">
                  Your referral contacts us, receives a free estimate, and we complete their project with our signature quality
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-secondary" />
                </div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold text-xl mb-3">You Earn $100</h3>
                <p className="text-muted-foreground">
                  Once the project is completed and paid, you receive $100 cash or credit toward your next project
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link Generator */}
          <Card className="max-w-2xl mx-auto border-2 border-secondary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold mb-6 text-center">Get Your Referral Link</h3>
              <form className="space-y-4" onSubmit={generateReferralCode}>
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Smith" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Your Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Your Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(201) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                  Generate My Referral Link
                </Button>
              </form>

              {referralCode && (
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm mb-2 block">Your Referral Link</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={referralLink} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={copyReferralLink}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <Label className="text-sm mb-3 block">Share on Social Media</Label>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => shareOnSocial('facebook')}
                        className="hover:bg-blue-50"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => shareOnSocial('twitter')}
                        className="hover:bg-blue-50"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => shareOnSocial('linkedin')}
                        className="hover:bg-blue-50"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => shareOnSocial('whatsapp')}
                        className="hover:bg-green-50"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
              Program Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Earn $100 for every completed referral",
                "No limit on number of referrals",
                "Cash payment or project credit",
                "Your referral gets 10% off their first project",
                "Track your referrals online",
                "Fast payment within 7 days of project completion"
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Referrer Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our customers are earning rewards while helping their community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "I've referred 3 neighbors so far and earned $300! It's easy money for sharing quality work I already trust."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold">Sarah M.</p>
                    <p className="text-sm text-muted-foreground">Teaneck, NJ</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    <span className="font-bold">3 Referrals • $300 Earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The referral program is fantastic. I used my earnings toward my own bathroom renovation - saved $500!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold">Michael R.</p>
                    <p className="text-sm text-muted-foreground">Hackensack, NJ</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-secondary" />
                    <span className="font-bold">5 Referrals • $500 Earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Quick and easy process. Shared my link with my book club and got 2 referrals in one week!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold">Jennifer L.</p>
                    <p className="text-sm text-muted-foreground">Fort Lee, NJ</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="font-bold">2 Referrals • $200 Earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">How do I track my referrals?</h3>
                <p className="text-muted-foreground">
                  Once you generate your referral link, you can call us at (201) 657-4345 to check the status of your referrals. We'll provide updates on scheduled estimates and completed projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">When will I receive my reward?</h3>
                <p className="text-muted-foreground">
                  You'll receive your $100 reward within 7 business days after your referral's project is completed and fully paid. You can choose cash payment or credit toward your next project.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Is there a limit to how many people I can refer?</h3>
                <p className="text-muted-foreground">
                  No limit! Refer as many people as you'd like. Each completed project earns you $100.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">What discount does my referral receive?</h3>
                <p className="text-muted-foreground">
                  Your referral gets 10% off their first project (maximum discount $500). This makes it a win-win for everyone!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Can I refer a business or commercial property?</h3>
                <p className="text-muted-foreground">
                  Yes! We work with both residential and commercial clients. The same referral rewards apply to commercial projects over $1,000.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8">Program Terms</h2>
          <div className="prose prose-lg max-w-none">
            <ul className="space-y-3 text-muted-foreground">
              <li>Referral must be a new customer who has not previously worked with Dependable Home Improvement</li>
              <li>Minimum project value of $1,000 required for referral reward</li>
              <li>Reward paid within 7 business days after project completion and full payment received</li>
              <li>Referrer must be 18 years or older</li>
              <li>Referral discount (10% off) applies to first project only, maximum discount $500</li>
              <li>Program terms subject to change; current customers will be notified of any changes</li>
              <li>Dependable Home Improvement reserves the right to modify or terminate the program at any time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-secondary via-secondary/90 to-accent">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Start Earning Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Know someone who needs quality home improvement? Refer them now and earn $100!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:2016574345">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                <Phone className="mr-2 h-5 w-5" />
                Call (201) 657-4345
              </Button>
            </a>
            <a href="mailto:prodendable@gmail.com">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container text-center">
          <p className="text-white/80">
            © 2025 Dependable Home Improvement. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
