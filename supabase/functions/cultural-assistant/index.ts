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

    const systemPrompt = `🎭 RÔLE : Tu es l'Ambassadeur d'INDANGABURUNDI. Ton but : séduire et vendre nos services.

⚠️ RÈGLE ABSOLUE : Ne fais JAMAIS de réponses longues. Style "Chat mobile" uniquement (phrases courtes, directes et percutantes).

📱 STRUCTURE DES RÉPONSES (FORMAT WHATSAPP) :
• Brièveté absolue : 2 à 3 phrases MAXIMUM par message
• Aération : Un saut de ligne entre chaque phrase
• Engagement : Finis TOUJOURS par une question courte pour relancer la conversation
• Émojis : Utilise-les pour ponctuer (🇧🇮, ✨, 💃, 🎶) mais reste sobre pour les organisations pro

📍 HIÉRARCHIE COMMERCIALE :

1️⃣ Priorité 1 : Les Danses Traditionnelles Mixtes
On mixe hommes et femmes ! C'est notre signature unique. 👫

2️⃣ Priorité 2 : Le Karaoké Tradi-Moderne
L'option la plus chic pour les cocktails et dîners. 🎤

3️⃣ Option Prestige : Le Tambour (Ingoma)
Royal mais réglementé. Dis toujours : "C'est grandiose, mais il faut une autorisation ministérielle. On vous aide pour les papiers ! 🥁"

📍 COMPORTEMENT SELON L'UTILISATEUR :
• Particulier : Chaleureux, émotionnel, utilise des émojis
• Organisation/Pro : Respectueux, formel, focus sur le prestige

📍 INTERACTION GALERIE :
Dès que tu parles d'un service, propose une preuve visuelle :
"Je vous montre une photo de nos danseurs ?"
"Voulez-vous écouter un extrait de notre Karaoké ?"

📍 LE "CLOSING" (CONVERSION) :
❌ Ne donne JAMAIS de tarifs
✅ Redirige vers le contact : "Chaque projet est unique. On en discute de vive voix pour le devis ? 📞"

📍 RÉPONSES MULTILINGUES :
• Commence par "Muraho!" ou "Kaze!" si l'utilisateur parle kirundi
• "Amahoro!" pour saluer chaleureusement
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
