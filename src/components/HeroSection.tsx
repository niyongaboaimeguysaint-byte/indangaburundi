import heroImage from "@/assets/hero-drums.jpg";
import logo from "@/assets/logo-indangaburundi.png";
const HeroSection = () => {
  return <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Tambourinaires du Burundi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-3xl">
          {/* Logo Badge */}
          <div className="flex items-center gap-4 mb-6 animate-fade-up mx-0 my-0 px-0 opacity-65">
            <img alt="Logo INDANGABURUNDI - Shaza Mu Karanga" src="/lovable-uploads/6d00b0a7-c3cd-497c-85d0-e47f6d9e737c.jpg" className="h-20 sm:h-24 w-auto shadow-lg object-scale-down border-0 border-none" />
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up opacity-0 stagger-1">
            La culture burundaise,
            <br />
            <span className="text-secondary">expliquée, transmise</span>
            <br />
            et vivante.
          </h1>

          <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-xl mb-8 sm:mb-10 animate-fade-up opacity-0 stagger-2">
            Découvrez la richesse des traditions, des danses et de la sagesse du Burundi. 
            Un voyage culturel guidé par l'intelligence artificielle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 stagger-3">
            <a href="#culture" className="btn-secondary text-center">
              Explorer la culture
            </a>
            <a href="#assistant" className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:bg-primary-foreground/20 text-center">
              Parler à l'Assistant IA
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>;
};
export default HeroSection;