import { useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import logo from "@/assets/logo-indangaburundi.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "#hero" },
    { name: "Histoire", href: "#history" },
    { name: "Culture", href: "#culture" },
    { name: "Quiz", href: "#quiz" },
    { name: "Médias", href: "#media" },
    { name: "Assistant", href: "#assistant" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3">
            <img
              alt="Logo INDANGABURUNDI - Culture Burundaise"
              src="/lovable-uploads/5ce7b6bf-73fc-42de-a3a1-4e9680cc765e.jpg"
              className="h-10 sm:h-12 w-auto opacity-100 shadow-lg rounded-md object-scale-down"
            />
            <span className="font-display font-bold text-2xl sm:text-3xl">
              <span className="text-primary">INDANGA</span>
              <span className="text-secondary">BURUNDI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={scrollToContact}
              className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5"
            >
              <CalendarCheck className="w-4 h-4" />
              Réserver un spectacle
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 px-2"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={scrollToContact}
                className="btn-secondary flex items-center justify-center gap-2 mt-2"
              >
                <CalendarCheck className="w-4 h-4" />
                Réserver un spectacle
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
