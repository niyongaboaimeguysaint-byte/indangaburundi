import logoGold from "@/assets/logo-gold.jpeg";
import { Calendar, Users, Globe, Award } from "lucide-react";
const milestones = [{
  year: "2014",
  title: "Fondation",
  description: "Création de l'association par des passionnés de la culture burundaise",
  icon: Users
}, {
  year: "2018",
  title: "Expansion Digitale",
  description: "Lancement de nos premières chansons, marquant le début d'une présence numérique culturelle forte",
  icon: Globe
}, {
  year: "2020",
  title: "Reconnaissance",
  description: "Partenariats avec des institutions culturelles internationales",
  icon: Award
}, {
  year: "2024",
  title: "Innovation IA",
  description: "Premier assistant culturel intelligent dédié au Burundi",
  icon: Calendar
}];
const HistorySection = () => {
  return <section id="history" className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div>
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              Notre Histoire
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              De la passion à la
              <span className="text-secondary"> mission</span>
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              INDANGABURUNDI est née de la volonté de préserver et transmettre la richesse 
              culturelle burundaise aux nouvelles générations. Notre nom signifie 
              <strong className="text-secondary"> "Le Miroir du Burundi"</strong> — 
              car nous reflétons l'âme et la beauté de notre patrimoine.
            </p>

            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              INDANGABURUNDI est fondée par un groupe de jeunes burundais. Nous célébrons, préservons et réinventons la richesse culturelle burundaise pour les générations d'aujourd'hui et de demain.
            </p>

            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <milestone.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-secondary font-bold">{milestone.year}</span>
                      <span className="font-display font-semibold">{milestone.title}</span>
                    </div>
                    <p className="text-primary-foreground/70 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Logo Column */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img alt="Logo INDANGABURUNDI" className="w-full h-full object-cover" src={logoGold} />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-secondary/30 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HistorySection;