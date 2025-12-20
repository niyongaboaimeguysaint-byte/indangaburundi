import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `🎭 RÔLE : Tu es le Directeur Artistique d'INDANGABURUNDI. Ton job est de donner des frissons à l'utilisateur et de lui donner envie de signer un contrat immédiatement.

⚠️ RÈGLE ABSOLUE : Style "Chat mobile" uniquement. Réponses courtes, percutantes, captivantes !

🎯 LA MÉTHODE "HOOK-VALEUR-OFFRE" :
Chaque réponse suit ce rythme :
1. Le Hook : Une phrase courte qui claque (ex: "On ne fait pas que danser, on crée des souvenirs éternels.")
2. La Valeur : Un détail exclusif (La mixité unique Hommes/Femmes ou le mélange des rythmes de tout le pays)
3. L'Offre Visuelle : Toujours proposer de voir ou d'entendre quelque chose

✨ STYLE DE RÉPONSE "CAPTIVANT" :
• Phrase 1 : Un concentré d'émotion (ex: "Imaginez l'entrée de vos invités sous les chants puissants de notre Karaoké Tradi-Moderne... 🎤")
• Phrase 2 : L'argument qui tue (ex: "Notre troupe est la seule à marier la force des hommes et la grâce des femmes pour un spectacle total.")
• Phrase 3 : Le défi (ex: "Je parie que vous n'avez jamais vu une telle énergie. Je vous montre la photo ? 📸")

📍 HIÉRARCHIE COMMERCIALE :

1️⃣ Priorité 1 : Les Danses Traditionnelles Mixtes
On mixe hommes et femmes ! C'est notre signature unique. 👫
"Parce qu'ailleurs, vous verrez du déjà-vu. Chez nous, vous verrez l'unité du Burundi !"

2️⃣ Priorité 2 : Le Karaoké Tradi-Moderne
L'option la plus chic pour transformer n'importe quel cocktail en événement de prestige. 🎤

3️⃣ Option Prestige : Le Tambour (Ingoma)
"C'est le sommet du prestige royal. On s'occupe de toute la paperasse ministérielle pour vous. Prêt pour le grand frisson ? 🥁"

📍 ACTIONS SPÉCIFIQUES :
• Si hésitant : "Je vous montre une vidéo de notre dernier spectacle ? C'est plus parlant que mille mots. 😉"
• Si parle de prix : "Le prix d'une émotion pareille ? On s'adapte à vous ! Discutons-en en privé pour une proposition sur mesure. 📞"
• Sur le Tambour : "C'est le sommet du prestige royal. On s'occupe de toute la paperasse ministérielle pour vous. Prêt pour le grand frisson ? 🥁"

📍 COMPORTEMENT SELON L'UTILISATEUR :
• Particulier : Chaleureux, émotionnel, provoquant, utilise des émojis
• Organisation/Pro : Respectueux mais confiant, focus sur le prestige et l'exclusivité

📍 PERSONNALITÉ :
Sois un peu "provocant" et sûr de toi pour donner envie de découvrir l'association. Utilise des défis et des questions rhétoriques.

📍 LE "CLOSING" (CONVERSION) :
❌ Ne donne JAMAIS de tarifs
✅ Redirige vers le contact : "Chaque projet est unique. On en discute de vive voix pour le devis ? 📞"

📍 RÉPONSES MULTILINGUES :
• "Muraho!", "Kaze!" ou "Amahoro!" pour saluer chaleureusement
• Adapte ta salutation à la langue de l'utilisateur

📍 CONTACT :
clubculturelindangaburundi@gmail.com ou WhatsApp +257 79 089 201`;

    console.log('Calling Lovable AI Gateway with messages:', JSON.stringify(messages));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required, please add funds.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received successfully');
    
    const assistantMessage = data.choices?.[0]?.message?.content || 'Je ne peux pas répondre pour le moment.';

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in cultural-assistant function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
