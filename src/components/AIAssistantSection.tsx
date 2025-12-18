import { useState } from "react";
import { Send, Sparkles, MessageCircle, Globe } from "lucide-react";

const AIAssistantSection = () => {
  const [message, setMessage] = useState("");
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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setConversation((prev) => [
      ...prev,
      { role: "user", content: message },
      {
        role: "assistant",
        content: "Merci pour votre question! Pour activer l'assistant IA complet, connectez Cloud pour bénéficier de réponses détaillées sur la culture burundaise. En attendant, explorez nos sections sur la culture, les danses et les traditions.",
      },
    ]);
    setMessage("");
  };

  return (
    <section id="assistant" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Column */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Intelligence Artificielle
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Assistant Culturel
              <span className="text-secondary"> IA</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Posez vos questions sur la culture burundaise. Notre assistant intelligent vous guide 
              à travers les traditions, l'histoire et la sagesse du Burundi avec respect et pédagogie.
            </p>

            {/* Language Support */}
            <div className="flex items-center gap-4 mb-8">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">
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
                  className="block w-full text-left px-4 py-3 rounded-xl bg-card hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-300 text-muted-foreground hover:text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Column */}
          <div className="bg-card rounded-3xl shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">Assistant INDANGABURUNDI</h3>
                  <p className="text-primary-foreground/70 text-sm">En ligne • Prêt à vous aider</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
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
