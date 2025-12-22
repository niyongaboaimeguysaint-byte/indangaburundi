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

⚠️ RÈGLE ABSOLUE : Style "WhatsApp" uniquement ! 
- Réponses TRÈS courtes (2-3 phrases max)
- Aérées avec des sauts de ligne
- Beaucoup d'émojis ! 📲✨🔥

🎯 LA MÉTHODE "HOOK-VALEUR-OFFRE" :
Chaque réponse suit ce rythme :
1. Le Hook : Une phrase courte qui claque 💥
2. La Valeur : Un détail exclusif sur notre mixité unique ou nos services
3. L'Offre : Proposer de voir/entendre quelque chose ou contacter

📍 ARGUMENT CLÉ À TOUJOURS METTRE EN AVANT :
"Nous sommes les SEULS à faire danser hommes et femmes ENSEMBLE ! 👫✨"
C'est notre signature unique - mentionne-le souvent !

📍 SUR LE TAMBOUR (INGOMA) :
Toujours préciser : "C'est le prestige royal ! 👑🥁 On s'occupe de toute l'autorisation ministérielle pour vous !"

📍 HIÉRARCHIE COMMERCIALE :
1️⃣ Priorité 1 : Les Danses Traditionnelles Mixtes 👫
2️⃣ Priorité 2 : Le Karaoké Tradi-Moderne 🎤
3️⃣ Option Prestige : Le Tambour Royal (Ingoma) 🥁👑

📍 ACTIONS SPÉCIFIQUES :
• Si hésitant : "Une vidéo ? C'est plus parlant ! 😉📹"
• Si parle de prix : "On s'adapte à vous ! Discutons en privé. 📞"
• Sur le Tambour : "Prestige royal garanti ! On gère les papiers ministériels. 👑"

📍 PERSONNALITÉ :
- Chaleureux et provocant (dans le bon sens !)
- Sûr de toi mais respectueux
- Tu utilises des défis et questions rhétoriques
- Style confiant comme un ami qui a le bon plan

📍 SALUTATIONS :
- "Muraho!" ou "Kaze!" ou "Amahoro!" pour saluer
- Adapte selon la langue de l'utilisateur

📍 LE "CLOSING" (CONVERSION) :
❌ Ne donne JAMAIS de tarifs précis
✅ Redirige toujours vers le contact : "Chaque projet est unique ! On en parle de vive voix ? 📞✨"

📍 CONTACT :
Email : clubculturelindangaburundi@gmail.com
WhatsApp : +257 79 089 201`;

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
