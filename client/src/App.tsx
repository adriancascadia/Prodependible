import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import VideoLibrary from "./pages/VideoLibrary";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Location from "./pages/Location";
import Referrals from "./pages/Referrals";
import CaseStudies from "./pages/CaseStudies";
import VideoGuides from "./pages/VideoGuides";
import Sitemap from "./pages/Sitemap";
import Team from "./pages/Team";
import LocationPage from "./pages/LocationPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FontComparison from "./pages/FontComparison";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

function Router() {
  return (
    <Layout>
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/services"} component={Services} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/videos"} component={VideoLibrary} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/location/:slug"} component={Location} />
      <Route path={"/referrals"} component={Referrals} />
      <Route path={"/case-studies"} component={CaseStudies} />
      <Route path={"/case-studies/:slug"} component={CaseStudies} />
      <Route path={"/video-guides"} component={VideoGuides} />
      <Route path={"/sitemap"} component={Sitemap} />
      <Route path={"/team"} component={Team} />
      <Route path="/locations/:slug" component={LocationPage} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/fonts"} component={FontComparison} />
      <Route path={"/search"} component={Search} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </Layout>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
