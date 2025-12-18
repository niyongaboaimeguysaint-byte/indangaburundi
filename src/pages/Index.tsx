import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CultureSection from "@/components/CultureSection";
import AIAssistantSection from "@/components/AIAssistantSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CultureSection />
      <AIAssistantSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
