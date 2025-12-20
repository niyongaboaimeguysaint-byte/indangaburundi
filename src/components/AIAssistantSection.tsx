import { useState } from "react";
import { Send, Sparkles, MessageCircle, Globe, Loader2, Music, Users, Crown, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logoGold from "@/assets/logo-gold.jpeg";

const AIAssistantSection = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Muraho! 🇧🇮✨ Je suis l'Ambassadeur Virtuel INDANGABURUNDI. Je suis là pour vous faire découvrir la richesse de la culture burundaise et vous accompagner dans l'organisation de vos événements. Que souhaitez-vous explorer aujourd'hui?",
    },
  ]);

  const quickActions = [
    {
      icon: Music,
      label: "🎶 Découvrir le Karaoké Tradi-Moderne",
      message: "Je souhaite découvrir votre offre de Karaoké Tradi-Moderne pour mon événement.",
    },
    {
      icon: Users,
      label: "💃 Voir nos spectacles de Danse",
      message: "Je voudrais en savoir plus sur vos spectacles de danse traditionnelle mixte.",
    },
    {
      icon: Crown,
      label: "👑 Option Tambour & Prestige",
      message: "Quelles sont vos prestations de prestige avec les tambours royaux?",
    },
    {
      icon: FileText,
      label: "📩 Demander un devis",
      message: "Je souhaite obtenir un devis personnalisé pour mon événement.",
    },
  ];

  const handleQuickAction = (actionMessage: string) => {
    setMessage(actionMessage);
    setTimeout(() => {
      handleSendMessage(actionMessage);
    }, 100);
  };

  const handleSendMessage = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || message;
    if (!messageToSend.trim() || isLoading) return;
    
    const userMessage = messageToSend.trim();
    setMessage("");
    
    setConversation((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    
    setIsLoading(true);
    
    try {
      const messages = [
        ...conversation.filter(msg => msg.role !== "assistant" || conversation.indexOf(msg) !== 0),
        { role: "user" as const, content: userMessage }
      ];
      
      const { data, error } = await supabase.functions.invoke('cultural-assistant', {
        body: { messages }
      });

      if (error) {
        console.error('Error calling assistant:', error);
        throw error;
      }

      if (data?.error) {
        if (data.error.includes('Rate limits')) {
          toast({
            title: "Limite atteinte",
            description: "Veuillez réessayer dans quelques instants.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error);
        }
        return;
      }

      let responseContent = data.message;
      
      // Check if the response mentions contacting or getting a quote
      if (responseContent.toLowerCase().includes('formulaire de contact') || 
          responseContent.toLowerCase().includes('devis personnalisé') ||
          responseContent.toLowerCase().includes('contacter notre direction')) {
        responseContent += '\n\n[Cliquez ici pour accéder au formulaire de contact](#contact)';
      }

      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: responseContent },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer." },
      ]);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderMessage = (content: string) => {
    // Check for contact link
    if (content.includes('[Cliquez ici pour accéder au formulaire de contact](#contact)')) {
      const parts = content.split('[Cliquez ici pour accéder au formulaire de contact](#contact)');
      return (
        <>
          {parts[0]}
          <button 
            onClick={scrollToContact}
            className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            📩 Accéder au formulaire de contact
          </button>
          {parts[1]}
        </>
      );
    }
    return content;
  };

  return (
    <section id="assistant" className="section-padding bg-muted relative overflow-hidden">
      {/* Animated Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <img 
          src={logoGold} 
          alt="" 
          className="w-[600px] h-auto object-contain animate-float" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Info Column */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Ambassadeur Virtuel
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Assistant INDANGABURUNDI
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              Découvrez nos prestations culturelles et organisez votre événement inoubliable. 
              Notre ambassadeur virtuel vous accompagne dans la découverte de la culture burundaise 
              et vous guide vers l'expérience parfaite pour votre occasion.
            </p>

            {/* Language Support */}
            <div className="flex items-center gap-4 mb-8">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm sm:text-base">
                Disponible en <strong className="text-foreground">Kirundi</strong>, 
                <strong className="text-foreground"> Français</strong> et 
                <strong className="text-foreground"> Anglais</strong>
              </span>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Actions rapides:</p>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.message)}
                  disabled={isLoading}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-300 text-muted-foreground hover:text-foreground text-sm sm:text-base disabled:opacity-50"
                >
                  <action.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Column */}
          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">Ambassadeur INDANGABURUNDI</h3>
                  <p className="text-primary-foreground/70 text-xs sm:text-sm">En ligne • Prêt à vous accompagner</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-64 sm:h-80 overflow-y-auto p-4 sm:p-6 space-y-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm sm:text-base ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.role === "assistant" ? renderMessage(msg.content) : msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Réflexion en cours...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 sm:p-6 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Posez votre question..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors text-sm sm:text-base disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !message.trim()}
                  className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
