import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalBusinessSchema } from "@/lib/schema";


export default function Contact() {
  const { t } = useLanguage();
  const schema = getLocalBusinessSchema();
    const businessEmail = schema.email || "prodependable@gmail.com";
    const businessPhone = schema.phone || "+12016374343";
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

    toast.success(t("contact.successMessage"));
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
      <Breadcrumb items={[{ label: t("contact.title") }]} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Phone className="h-5 w-5 mr-2 inline" />
              {t("contact.badge")}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("contact.title")}</h1>
            <p className="text-xl text-white/90">
              {t("contact.subtitle")}
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
                  <h2 className="text-3xl font-bold text-primary mb-6">{t("contact.formTitle")}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                          {t("contact.name")} *
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
                          {t("contact.email")} *
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
                          {t("contact.phone")} *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(201) 555-2222"
                          className="border-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">
                          {t("contact.service")} *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full border-2 border-input bg-background px-3 py-2 rounded-md text-sm"
                        >
                          <option value="">{t("contact.selectService")}</option>
                          <option value="andersen-windows">{t("contact.andersenDoors")}</option>
                          <option value="handyman">{t("contact.handyman")}</option>
                          <option value="carpentry">{t("contact.carpentry")}</option>
                          <option value="painting">{t("contact.painting")}</option>
                          <option value="renovation">{t("contact.renovation")}</option>
                          <option value="other">{t("contact.other")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        {t("contact.projectDetails")} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.projectPlaceholder")}
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
                        <>{t("contact.sending")}</>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          {t("contact.submit")}
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
                  <h3 className="text-xl font-bold text-primary mb-4">{t("contact.contactInfo")}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t("contact.phoneLabel")}</p>
                        <a href="tel:+12016374345" className="text-primary hover:text-secondary transition-colors">
                          {businessPhone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t("contact.emailLabel")}</p>
                        <a href="mailto:info@prodependable.com" className="text-primary hover:text-secondary transition-colors">
                          {businessEmail}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t("contact.serviceArea")}</p>
                        <p className="text-foreground/80">{t("contact.serviceAreaText")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t("contact.businessHours")}</p>
                        <p className="text-foreground/80">{t("contact.monFri")}</p>
                        <p className="text-foreground/80">{t("contact.sat")}</p>
                        <p className="text-foreground/80">{t("contact.sun")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary bg-secondary/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{t("contact.emergency")}</h3>
                  <p className="text-foreground/90 mb-4">
                    {t("contact.emergencyText")}
                  </p>
                  <Button variant="outline" className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    {t("contact.callEmergency")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{t("contact.licensed")}</h3>
                  <div className="space-y-2 text-sm text-foreground/90">
                    <p>✓ {t("contact.njLicense")}</p>
                    <p>✓ {t("contact.generalLiability")}</p>
                    <p>✓ {t("contact.workersComp")}</p>
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
