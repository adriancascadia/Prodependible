import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Shield className="h-5 w-5 mr-2 inline" />
              Legal
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/90">Last Updated: November 2024</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">Introduction</h2>
            <p className="text-muted-foreground mb-8">
              Dependable Home Improvement ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Information We Collect</h2>
            <h3 className="text-2xl font-bold text-primary mb-4">Personal Information</h3>
            <p className="text-muted-foreground mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Request a quote or consultation</li>
              <li>Fill out contact forms on our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in our referral program</li>
              <li>Communicate with us via phone, email, or chat</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              This information may include your name, email address, phone number, mailing address, project details, and any other information you choose to provide.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4">Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">
              When you visit our website, we may automatically collect certain information about your device and browsing activity, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Clickstream data</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you quotes, estimates, and project updates</li>
              <li>Process referral program rewards</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us with website hosting, email delivery, analytics, and other business operations</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-8">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. 
              You can control cookie preferences through your browser settings, though disabling cookies may affect website functionality.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Data Security</h2>
            <p className="text-muted-foreground mb-8">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              To exercise these rights, please contact us using the information provided below.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Third-Party Links</h2>
            <p className="text-muted-foreground mb-8">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. 
              We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Children's Privacy</h2>
            <p className="text-muted-foreground mb-8">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. 
              If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-8">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last Updated" date. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-muted/30 rounded-xl p-6 mb-8">
              <p className="text-primary font-bold mb-2">Dependable Home Improvement</p>
              <p className="text-muted-foreground">Email: info@prodependable.com</p>
              <p className="text-muted-foreground">Phone: (201) 960-5325</p>
              <p className="text-muted-foreground">Address: Bergen County, New Jersey</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
