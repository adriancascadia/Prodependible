import { Link } from "wouter";
import { useEffect } from "react";
import { getServiceSchemas, injectSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Wrench, Hammer, PaintBucket, Lightbulb, CheckCircle2, 
  ArrowRight, Phone, Star, DoorOpen 
} from "lucide-react";

export default function Services() {
  const { t } = useLanguage();
  // Inject Service schemas for SEO
  useEffect(() => {
    const schemas = getServiceSchemas();
    const cleanups = schemas.map(schema => injectSchema(schema));
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  const services = [
    {
      icon: DoorOpen,
      titleKey: "services.andersen.title",
      descriptionKey: "services.andersen.description",
      featuresKeys: [
        "services.andersen.features.windowInstall",
        "services.andersen.features.doorInstall",
        "services.andersen.features.energyEfficient",
        "services.andersen.features.customSizing",
        "services.andersen.features.weatherproofing",
        "services.andersen.features.warranty"
      ],
      benefitsKeys: [
        "services.andersen.benefits.partnership",
        "services.andersen.benefits.trained",
        "services.andersen.benefits.premium",
        "services.andersen.benefits.energySavings"
      ]
    },
    {
      icon: Wrench,
      titleKey: "services.handyman.title",
      descriptionKey: "services.handyman.description",
      featuresKeys: [
        "services.handyman.features.fixtures",
        "services.handyman.features.doorWindow",
        "services.handyman.features.drywall",
        "services.handyman.features.shelfCabinet",
        "services.handyman.features.maintenance",
        "services.handyman.features.furniture"
      ],
      benefitsKeys: [
        "services.handyman.benefits.quickResponse",
        "services.handyman.benefits.honestPricing",
        "services.handyman.benefits.noJobSmall",
        "services.handyman.benefits.experienced"
      ]
    },
    {
      icon: Hammer,
      titleKey: "services.carpentry.title",
      descriptionKey: "services.carpentry.description",
      featuresKeys: [
        "services.carpentry.features.customCabinetry",
        "services.carpentry.features.deckConstruction",
        "services.carpentry.features.trimMolding",
        "services.carpentry.features.doorWindow",
        "services.carpentry.features.furnitureRestoration",
        "services.carpentry.features.structuralRepairs"
      ],
      benefitsKeys: [
        "services.carpentry.benefits.experience",
        "services.carpentry.benefits.customDesign",
        "services.carpentry.benefits.quality",
        "services.carpentry.benefits.durable"
      ]
    },
    {
      icon: PaintBucket,
      titleKey: "services.painting.title",
      descriptionKey: "services.painting.description",
      featuresKeys: [
        "services.painting.features.interiorPainting",
        "services.painting.features.exteriorPainting",
        "services.painting.features.cabinetRefinishing",
        "services.painting.features.deckStaining",
        "services.painting.features.colorConsultation",
        "services.painting.features.surfacePrep"
      ],
      benefitsKeys: [
        "services.painting.benefits.premiumPaints",
        "services.painting.benefits.meticulous",
        "services.painting.benefits.cleanFinish",
        "services.painting.benefits.respectHome"
      ]
    },
    {
      icon: Lightbulb,
      titleKey: "services.renovation.title",
      descriptionKey: "services.renovation.description",
      featuresKeys: [
        "services.renovation.features.kitchenRemodel",
        "services.renovation.features.bathroomReno",
        "services.renovation.features.basementFinish",
        "services.renovation.features.wholeHome",
        "services.renovation.features.designConsult"
      ],
      benefitsKeys: [
        "services.renovation.benefits.projectManagement",
        "services.renovation.benefits.licensed",
        "services.renovation.benefits.transparent",
        "services.renovation.benefits.guaranteed"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <Breadcrumb items={[{ label: t('nav.services') }]} />
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Star className="h-5 w-5 mr-2 inline fill-secondary" />
              {t('services.badge')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('services.title')}</h1>
            <p className="text-xl text-white/90">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-accent mb-6">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h2 className="text-4xl font-bold text-primary mb-4">
                    {t(service.titleKey)}
                  </h2>
                  
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('services.whatWeOffer')}</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.featuresKeys.map((featureKey, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/#contact">
                    <Button size="lg" className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary text-lg px-8 py-6">
                      {t('services.getEstimate')}
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                </div>

                <Card className={`border-2 border-secondary/20 shadow-2xl ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-6">{t('services.whyChooseUs')}</h3>
                    <ul className="space-y-4">
                      {service.benefitsKeys.map((benefitKey, i) => (
                        <li key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-lg text-foreground font-medium pt-0.5">{t(benefitKey)}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-8 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{t('services.rating')}</p>
                          <p className="text-sm text-muted-foreground">{t('services.trustedBy')}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-accent to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-primary/80 mb-10 max-w-2xl mx-auto">
            {t('services.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:2016374345">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6">
                <Phone className="mr-2 h-6 w-6" />
                (201) 637-4345
              </Button>
            </a>
            <Link href="/#contact">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-primary text-primary hover:bg-white/20 text-lg px-10 py-6">
                {t('services.requestEstimateOnline')}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
