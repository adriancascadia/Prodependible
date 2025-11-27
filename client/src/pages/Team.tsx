import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Wrench } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamMember {
  name: string;
  title: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
}

export default function Team() {
  const { t } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/team.json")
      .then(res => res.json())
      .then(data => {
        setTeam(data.team);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load team:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t('team.loading')}</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: t('nav.team') }]} />
      {/* Hero Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <Users className="h-5 w-5 mr-2 inline" />
              {t('team.badge')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('team.title')}</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('team.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, idx) => (
              <Card key={idx} className="group overflow-hidden border-2 hover:border-secondary transition-all hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&size=400&background=8B7355&color=fff&bold=true`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-1">{member.name}</h3>
                      <p className="text-secondary text-lg font-medium">{member.title}</p>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-secondary" />
                        <span className="text-sm font-medium text-muted-foreground">{member.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-secondary" />
                        <span className="text-sm font-medium text-muted-foreground">{member.specialty}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{t('team.whyChoose.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t('team.whyChoose.experienced.title')}</h3>
                <p className="text-muted-foreground">{t('team.whyChoose.experienced.desc')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t('team.whyChoose.licensed.title')}</h3>
                <p className="text-muted-foreground">{t('team.whyChoose.licensed.desc')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t('team.whyChoose.quality.title')}</h3>
                <p className="text-muted-foreground">{t('team.whyChoose.quality.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
