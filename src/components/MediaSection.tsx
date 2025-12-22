import { Play, Image as ImageIcon, Music, Video } from "lucide-react";
import heroImage from "@/assets/hero-drums.jpg";
import danceImage from "@/assets/dance-culture.jpg";
import drumImage from "@/assets/drum-detail.jpg";
import culturePortrait from "@/assets/culture-portrait.jpg";
import danseSpectacle from "@/assets/danse-spectacle-live.jpg";

interface MediaItem {
  id: number;
  type: "video" | "image";
  title: string;
  description: string;
  thumbnail: string;
  category: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "video",
    title: "Performance des Tambourinaires",
    description: "Les Ingoma en action lors d'une cérémonie traditionnelle",
    thumbnail: heroImage,
    category: "Musique",
  },
  {
    id: 2,
    type: "image",
    title: "Danse Intore",
    description: "Les guerriers exécutant la danse traditionnelle",
    thumbnail: danceImage,
    category: "Danse",
  },
  {
    id: 3,
    type: "image",
    title: "Artisanat des Tambours",
    description: "La fabrication artisanale des Ingoma",
    thumbnail: drumImage,
    category: "Artisanat",
  },
  {
    id: 4,
    type: "video",
    title: "Témoignage Culturel",
    description: "Interview sur la transmission des traditions",
    thumbnail: culturePortrait,
    category: "Témoignage",
  },
  {
    id: 5,
    type: "image",
    title: "Spectacle Live - Danse Mixte",
    description: "Notre troupe mixte en pleine performance sur scène",
    thumbnail: danseSpectacle,
    category: "Danse",
  },
];

const MediaSection = () => {
  return (
    <section id="media" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            <Video className="w-4 h-4" />
            Galerie Médias
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Découvrez en <span className="text-secondary">images</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explorez notre collection de photos et vidéos sur la culture burundaise.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Tout", "Musique", "Danse", "Artisanat", "Témoignage"].map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                cat === "Tout"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 w-full">
                  <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-primary-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Media Type Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center">
                {item.type === "video" ? (
                  <Play className="w-5 h-5 text-primary" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Audio Section */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Écouter les <span className="text-secondary">sons du Burundi</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Rythmes d'Ingoma", duration: "3:45" },
              { title: "Chants traditionnels", duration: "4:12" },
              { title: "Poésie Kirundi", duration: "2:30" },
            ].map((audio, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </button>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{audio.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Music className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{audio.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
