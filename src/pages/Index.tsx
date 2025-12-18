import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HistorySection from "@/components/HistorySection";
import AboutSection from "@/components/AboutSection";
import CultureSection from "@/components/CultureSection";
import QuizSection from "@/components/QuizSection";
import MediaSection from "@/components/MediaSection";
import AIAssistantSection from "@/components/AIAssistantSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HistorySection />
      <AboutSection />
      <CultureSection />
      <QuizSection />
      <MediaSection />
      <AIAssistantSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
