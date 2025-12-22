import { useState } from "react";
import { Mail, MessageSquare, Users, Send, Instagram, Youtube, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé!",
      description: "Nous vous répondrons dans les plus brefs délais."
    });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      description: "clubculturelindangaburundi@gmail.com",
      action: "Nous écrire",
      href: "mailto:clubculturelindangaburundi@gmail.com"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "+257 79 089 201",
      action: "Discuter",
      href: "https://wa.me/25779089201"
    },
    {
      icon: Users,
      title: "Partenariats",
      description: "Artistes, écoles, ONG",
      action: "Collaborer",
      href: "#contact-form"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      href: "https://instagram.com/indangaburundi",
      color: "hover:text-pink-500"
    },
    {
      icon: Youtube,
      name: "YouTube",
      href: "https://youtube.com/@indangaburundi",
      color: "hover:text-red-500"
    },
    {
      icon: Facebook,
      name: "Facebook",
      href: "https://facebook.com/indangaburundi",
      color: "hover:text-blue-500"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            Rejoignez-nous
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact &
            <span className="text-secondary"> Collaboration</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Artistes, éducateurs, partenaires culturels — rejoignez notre mission 
            de préservation et de transmission de la culture burundaise.
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mt-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:shadow-lg transition-all duration-300 group ${social.color}`}
                aria-label={`Suivez-nous sur ${social.name}`}
              >
                <social.icon className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-all duration-300" />
                <span className="text-sm font-medium text-muted-foreground">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Options */}
          <div className="space-y-6">
            {contactOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="flex items-center gap-6 p-6 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <option.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground">{option.description}</p>
                </div>
                <span className="text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                  {option.action} →
                </span>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form id="contact-form" onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 shadow-lg">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Envoyez-nous un message
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
