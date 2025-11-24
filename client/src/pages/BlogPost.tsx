import { useEffect, useState } from "react";
import { getBlogPostingSchema, injectSchema } from "@/lib/schema";
import { useRoute, Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, Phone } from "lucide-react";
import { toast } from "sonner";

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
  content: string;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog-posts.json')
      .then(res => res.json())
      .then(data => {
        const foundPost = data.posts.find((p: BlogPost) => p.slug === params?.slug);
        setPost(foundPost || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setLoading(false);
      });
  }, [params?.slug]);

  // Inject BlogPosting schema for SEO
  useEffect(() => {
    if (!post) return;
    const schema = getBlogPostingSchema(post);
    const cleanup = injectSchema(schema);
    return cleanup;
  }, [post]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
        <Link href="/blog">
          <Button>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: post.title }
      ]} />
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link href="/blog">
              <Button variant="outline" className="mb-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Button>
            </Link>
            
            <Badge className="mb-4 bg-secondary text-primary px-4 py-2">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {post.readTime}
              </div>
              <div>By {post.author}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-12 pb-6 border-b">
            <p className="text-xl text-muted-foreground italic">
              {post.excerpt}
            </p>
            <Button variant="outline" onClick={handleShare} className="flex-shrink-0 ml-4">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-3xl font-bold text-primary mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-primary mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              } else {
                return (
                  <p key={idx} className="text-lg text-foreground/90 leading-relaxed mb-6">
                    {paragraph.split('**').map((part, i) => 
                      i % 2 === 0 ? part : <strong key={i} className="font-bold text-primary">{part}</strong>
                    )}
                  </p>
                );
              }
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 border-2 border-secondary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Need Help With Your Project?
                </h3>
                <p className="text-muted-foreground">
                  Our experienced team is ready to bring your vision to life
                </p>
              </div>
              <a href="tel:2016374345">
                <Button size="lg" className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary text-lg px-8 py-6 whitespace-nowrap">
                  <Phone className="mr-2 h-6 w-6" />
                  (201) 637-4345
                </Button>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Request a free estimate and see how we can transform your space
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-6">
              Get Free Estimate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
