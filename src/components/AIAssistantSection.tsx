import { useState } from "react";
import { Send, Sparkles, MessageCircle, Globe, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AIAssistantSection = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Muraho! Je suis votre assistant culturel INDANGABURUNDI. Je peux répondre à vos questions sur la culture burundaise en français, en kirundi ou en anglais. Que souhaitez-vous découvrir aujourd'hui?",
    },
  ]);

  const suggestedQuestions = [
    "Quelle est l'origine des tambours sacrés?",
    "Que signifie 'Ubuntu' dans la culture burundaise?",
    "Quelles sont les danses traditionnelles les plus connues?",
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
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

      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
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

  return (
    <section id="assistant" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Info Column */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Intelligence Artificielle
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Assistant Culturel
              <span className="text-secondary"> IA</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              Posez vos questions sur la culture burundaise. Notre assistant intelligent vous guide 
              à travers les traditions, l'histoire et la sagesse du Burundi avec respect et pédagogie.
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

            {/* Suggested Questions */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Questions suggérées:</p>
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setMessage(question)}
                  className="block w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-300 text-muted-foreground hover:text-foreground text-sm sm:text-base"
                >
                  {question}
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
                  <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">Assistant INDANGABURUNDI</h3>
                  <p className="text-primary-foreground/70 text-xs sm:text-sm">En ligne • Prêt à vous aider</p>
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
                    {msg.content}
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
                  onClick={handleSendMessage}
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
