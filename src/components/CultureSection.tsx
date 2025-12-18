import danceImage from "@/assets/dance-culture.jpg";
import drumImage from "@/assets/drum-detail.jpg";
import heroImage from "@/assets/hero-drums.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const CultureSection = () => {
  const cultureCards = [
    {
      title: "Danses Traditionnelles",
      description: "L'expression corporelle comme langage universel, transmise de génération en génération.",
      image: danceImage,
      tag: "Patrimoine UNESCO",
    },
    {
      title: "Musique & Tambours",
      description: "Les tambours sacrés du Burundi, symbole de royauté et de spiritualité ancestrale.",
      image: heroImage,
      tag: "Tradition Royale",
    },
    {
      title: "Proverbes & Sagesse",
      description: "La philosophie burundaise condensée en paroles qui guident la vie quotidienne.",
      image: drumImage,
      tag: "Sagesse Orale",
    },
  ];

  return (
    <section id="culture" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            Patrimoine Culturel
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Découvrez la
            <span className="text-secondary"> culture burundaise</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explorez les facettes de notre riche héritage culturel. 
            Chaque élément raconte une histoire, chaque tradition porte un sens profond.
          </p>
        </div>

        {/* Culture Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cultureCards.map((card, index) => (
            <div
              key={card.title}
              className="group card-cultural overflow-hidden"
            >
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                  {card.tag}
                </span>
              </div>
              
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {card.description}
              </p>
              
              <a
                href="#assistant"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Comprendre avec l'IA
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Proverb Banner */}
        <div className="mt-20 bg-primary rounded-3xl p-10 md:p-16 text-center">
          <p className="font-display text-2xl md:text-4xl text-primary-foreground italic mb-6">
            "Umwana si uwumwe"
          </p>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Un enfant n'appartient pas à une seule personne — il est élevé par toute la communauté.
            La sagesse burundaise sur l'éducation collective.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
