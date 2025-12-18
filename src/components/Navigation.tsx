import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-indangaburundi.png";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{
    name: "Accueil",
    href: "#hero"
  }, {
    name: "Histoire",
    href: "#history"
  }, {
    name: "Culture",
    href: "#culture"
  }, {
    name: "Quiz",
    href: "#quiz"
  }, {
    name: "Médias",
    href: "#media"
  }, {
    name: "Assistant IA",
    href: "#assistant"
  }, {
    name: "Contact",
    href: "#contact"
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3">
            <img alt="Logo INDANGABURUNDI - Shaza Mu Karanga" src="/lovable-uploads/5ce7b6bf-73fc-42de-a3a1-4e9680cc765e.jpg" className="h-10 sm:h-12 w-auto opacity-100 shadow-lg rounded-md object-scale-down" />
            <span className="font-display font-bold text-lg sm:text-xl">
              <span className="text-primary">INDANGA</span>
              <span className="text-secondary">BURUNDI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm">
                {link.name}
              </a>)}
            <a href="#assistant" className="btn-primary text-sm px-5 py-2.5">
              Parler à l'IA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 px-2">
                  {link.name}
                </a>)}
              <a href="#assistant" onClick={() => setIsOpen(false)} className="btn-primary text-center mt-2">
                Parler à l'IA
              </a>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;