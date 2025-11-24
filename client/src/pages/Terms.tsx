import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <FileText className="h-5 w-5 mr-2 inline" />
              Legal
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-white/90">Last Updated: November 2024</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-6">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-8">
              By accessing or using the services of Dependable Home Improvement ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Services Provided</h2>
            <p className="text-muted-foreground mb-4">
              Dependable Home Improvement provides professional home improvement and renovation services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Custom deck construction and restoration</li>
              <li>Door and window installation</li>
              <li>Interior and exterior renovations</li>
              <li>Basement finishing</li>
              <li>General carpentry and repairs</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Estimates and Quotes</h2>
            <p className="text-muted-foreground mb-8">
              All estimates and quotes provided are based on the information available at the time of assessment. Final pricing may vary based on 
              unforeseen conditions, material costs, or changes in project scope. We will communicate any significant price changes before proceeding with work.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Payment terms will be outlined in your project contract. Generally:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>A deposit may be required before work begins</li>
              <li>Progress payments may be requested at specified milestones</li>
              <li>Final payment is due upon project completion and your satisfaction</li>
              <li>We accept cash, check, and major credit cards</li>
              <li>Late payments may incur additional fees</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Project Timeline</h2>
            <p className="text-muted-foreground mb-8">
              We provide estimated timelines for all projects. While we strive to meet these deadlines, actual completion dates may be affected by 
              weather conditions, material availability, permit delays, or unforeseen circumstances. We will keep you informed of any delays.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Changes and Modifications</h2>
            <p className="text-muted-foreground mb-8">
              Any changes to the agreed-upon scope of work must be documented in writing and may result in adjustments to the project cost and timeline. 
              Change orders must be approved by both parties before implementation.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Warranties</h2>
            <p className="text-muted-foreground mb-4">
              We stand behind our work with the following warranties:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li><strong>Workmanship Warranty:</strong> We guarantee our workmanship for a specified period outlined in your contract</li>
              <li><strong>Material Warranties:</strong> Materials are covered by manufacturer warranties, which we will help you access if needed</li>
              <li><strong>Warranty Exclusions:</strong> Warranties do not cover damage from misuse, neglect, normal wear and tear, or unauthorized modifications</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Client Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              As a client, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Provide accurate information about your property and project requirements</li>
              <li>Ensure access to the work area during scheduled work hours</li>
              <li>Secure pets and remove valuable items from work areas</li>
              <li>Obtain any necessary homeowner association approvals</li>
              <li>Make timely payments according to the agreed schedule</li>
              <li>Communicate any concerns promptly</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Permits and Compliance</h2>
            <p className="text-muted-foreground mb-8">
              We will obtain necessary permits for work as required by local regulations. Permit costs are typically included in project estimates 
              unless otherwise specified. All work will be performed in compliance with applicable building codes and regulations.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Insurance and Liability</h2>
            <p className="text-muted-foreground mb-8">
              Dependable Home Improvement maintains general liability insurance and workers' compensation coverage. We are not liable for 
              pre-existing conditions, hidden defects, or damage resulting from circumstances beyond our control.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Cancellation Policy</h2>
            <p className="text-muted-foreground mb-4">
              Either party may cancel a project under the following terms:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-8 space-y-2">
              <li>Written notice must be provided</li>
              <li>Deposits may be non-refundable if materials have been ordered or work has begun</li>
              <li>You will be responsible for payment for work completed and materials purchased</li>
              <li>We reserve the right to cancel projects if payment terms are not met</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Dispute Resolution</h2>
            <p className="text-muted-foreground mb-8">
              In the event of a dispute, we encourage open communication to reach a mutually satisfactory resolution. If necessary, 
              disputes may be resolved through mediation or arbitration in Bergen County, New Jersey, before pursuing legal action.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-8">
              Our liability is limited to the total amount paid for the specific project in question. We are not liable for indirect, 
              incidental, or consequential damages.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Intellectual Property</h2>
            <p className="text-muted-foreground mb-8">
              All designs, plans, and creative work produced by Dependable Home Improvement remain our intellectual property unless 
              otherwise agreed in writing. You may not reproduce or distribute our proprietary materials without permission.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Referral Program</h2>
            <p className="text-muted-foreground mb-8">
              Our referral program terms are subject to change. Rewards are issued after the referred project is completed and paid in full. 
              We reserve the right to modify or discontinue the referral program at any time.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Privacy</h2>
            <p className="text-muted-foreground mb-8">
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, 
              use, and protect your personal information.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Changes to Terms</h2>
            <p className="text-muted-foreground mb-8">
              We reserve the right to modify these Terms of Service at any time. Updated terms will be posted on our website with a revised 
              "Last Updated" date. Continued use of our services constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Governing Law</h2>
            <p className="text-muted-foreground mb-8">
              These Terms of Service are governed by the laws of the State of New Jersey, without regard to conflict of law principles.
            </p>

            <h2 className="text-3xl font-bold text-primary mb-6 mt-12">Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted/30 rounded-xl p-6 mb-8">
              <p className="text-primary font-bold mb-2">Dependable Home Improvement</p>
              <p className="text-muted-foreground">Email: info@prodependable.com</p>
              <p className="text-muted-foreground">Phone: (201) 960-5325</p>
              <p className="text-muted-foreground">Address: Bergen County, New Jersey</p>
            </div>

            <p className="text-muted-foreground text-sm italic mt-12">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
