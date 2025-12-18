import culturePortrait from "@/assets/culture-portrait.jpg";
import { Target, Eye, Heart } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Préserver et transmettre le patrimoine culturel burundais aux générations futures.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "Faire rayonner la culture burundaise à travers le monde grâce au numérique.",
    },
    {
      icon: Heart,
      title: "Valeurs",
      description: "Respect des traditions, innovation, inclusion et partage du savoir.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={culturePortrait}
                alt="Culture burundaise"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl shadow-lg max-w-xs hidden lg:block">
              <p className="font-display text-2xl text-foreground mb-2">"Ubuntu"</p>
              <p className="text-muted-foreground text-sm">
                Je suis parce que nous sommes — la philosophie au cœur de notre culture.
              </p>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Qui sommes-nous
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              INDANGABURUNDI
              <br />
              <span className="text-secondary">en bref</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              INDANGABURUNDI est une association dédiée à la valorisation de la culture burundaise. 
              Nous croyons que chaque tradition, chaque danse, chaque proverbe porte en lui 
              une sagesse universelle qui mérite d'être partagée et comprise.
            </p>

            <div className="space-y-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="flex gap-4 items-start p-4 rounded-xl bg-card hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
