import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    if (language === "en") setLanguage("es");
    else if (language === "es") setLanguage("ru");
    else setLanguage("en");
  };

  const getLanguageLabel = () => {
    if (language === "en") return "ESP";
    if (language === "es") return "РУС";
    return "ENG";
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {getLanguageLabel()}
    </Button>
  );
}
