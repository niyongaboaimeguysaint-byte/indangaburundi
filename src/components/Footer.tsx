const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              INDANGA<span className="text-secondary">BURUNDI</span>
            </h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Préserver, transmettre et célébrer la culture burundaise 
              à travers le monde.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Accueil", "À propos", "Culture", "Assistant IA", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace("à propos", "about").replace(" ", "-")}`}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Culture */}
          <div>
            <h4 className="font-semibold mb-4">Explorer</h4>
            <ul className="space-y-2">
              {["Danses traditionnelles", "Musique & Tambours", "Proverbes", "Sagesse burundaise"].map((item) => (
                <li key={item}>
                  <a
                    href="#culture"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} INDANGABURUNDI. Tous droits réservés.
            </p>
            <p className="text-primary-foreground/60 text-sm italic font-display">
              "Umuntu ni umuntu kubera abandi" — Une personne est une personne grâce aux autres
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
