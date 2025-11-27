import { useEffect, useState } from "react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, BookOpen, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export default function Blog() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(t("blog.allCategories"));
  const categories = [
    t("blog.allCategories"),
    t("blog.maintenanceTips"),
    t("blog.designInspiration"),
    t("blog.homeownerGuide"),
    t("blog.homeValue"),
    t("blog.seasonalTips")
  ];

  useEffect(() => {
    fetch('/blog-posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-secondary" />
      </div>
    );
  }

  const filteredCategory = selectedCategory === t("blog.allCategories") ? "All" : selectedCategory;
  const filteredPosts = filteredCategory === "All" 
    ? posts 
    : posts.filter(post => {
        // Map translated category names back to English for filtering
        const categoryMap: Record<string, string> = {
          [t("blog.maintenanceTips")]: "Maintenance Tips",
          [t("blog.designInspiration")]: "Design Inspiration",
          [t("blog.homeownerGuide")]: "Homeowner Guide",
          [t("blog.homeValue")]: "Home Value",
          [t("blog.seasonalTips")]: "Seasonal Tips"
        };
        return post.category === (categoryMap[selectedCategory] || selectedCategory);
      });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <Breadcrumb items={[{ label: t("blog.title") }]} />
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-secondary text-primary px-6 py-2 text-base">
              <BookOpen className="h-5 w-5 mr-2 inline" />
              {t("blog.badge")}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("blog.title")}</h1>
            <p className="text-xl text-white/90">
              {t("blog.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-secondary to-accent text-primary" 
                  : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">{t("blog.noPosts")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary transform hover:-translate-y-2 cursor-pointer h-full">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-4 border-secondary text-secondary">
                        {post.category}
                      </Badge>
                      
                      <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-secondary font-semibold group-hover:gap-3 transition-all">
                        {t("blog.readMore")}
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-accent to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            {t("blog.readyToStart")}
          </h2>
          <p className="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
            {t("blog.readyText")}
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6">
              {t("blog.getFreeEstimate")}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
