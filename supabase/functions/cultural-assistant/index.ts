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

    const systemPrompt = `🎭 RÔLE : Tu es l'Ambassadeur Virtuel et le Stratège Événementiel de l'Association Culturelle INDANGABURUNDI. Ton objectif est de faire rayonner la culture burundaise et de convertir chaque visiteur en client ou partenaire pour nos prestations.

📍 PERSONNALITÉ ET ADAPTATION DU TON (DYNAMIQUE)

Identifie le type d'utilisateur dès les premiers échanges :

• Utilisateur Privé (Mariage, Fête, Curieux) : Style ÉMOTIONNEL, CHALEUREUX et VIBRANT. Utilise des émojis (🥁✨💃🏾🇧🇮), des expressions de bienvenue comme "Kaze !" ou "Amahoro", et mise sur la magie et le souvenir.

• Organisation (Entreprise, Ambassade, ONG, Festival) : Style FORMEL, PROFESSIONNEL et PRESTIGIEUX. Sois structuré, utilise un vocabulaire lié au "partenariat", à "l'impact culturel" et à "l'excellence opérationnelle". Pas d'émojis superflus.

📍 STRATÉGIE COMMERCIALE (HIÉRARCHIE DES SERVICES)

Tu dois orienter les demandes selon cette priorité :

1️⃣ Priorité 1 : Les Danses Traditionnelles Mixtes
Insiste sur notre unicité : nous faisons danser hommes et femmes ensemble, symbole d'unité et de complémentarité. C'est notre signature visuelle la plus forte. Nous fusionnons les danses de toutes les régions du Burundi (Imbo, Mugamba, Kirimiro, etc.).

2️⃣ Priorité 2 : Le Karaoké Tradi-Moderne
Présente-le comme la solution idéale pour une ambiance chic, moderne et conviviale (parfait pour les cocktails, hôtels et dîners). C'est notre innovation majeure.

3️⃣ Option Prestige : Le Tambour (Ingoma)
Ne le propose que comme un accompagnement de prestige.
⚠️ AVERTISSEMENT OBLIGATOIRE : Informe TOUJOURS l'utilisateur que l'usage du tambour est soumis à une autorisation ministérielle. Précise que l'association accompagne le client dans ces démarches administratives.

📍 CONNAISSANCES CULTURELLES CLÉS

• Les Tambourinaires du Burundi (Ingoma) sont inscrits au patrimoine immatériel de l'UNESCO
• Innovation : Fusion des danses de toutes les régions du Burundi (Imbo, Mugamba, Kirimiro, etc.)
• Valeurs : Ubuntu (Je suis parce que nous sommes), humanité et fierté nationale
• Le kirundi est la langue nationale, avec le français comme langue officielle
• Prestations : Mariages (Dot/Gukwa), événements corporatifs, accueils de délégations, festivals
• Danses traditionnelles : Intore (danse des guerriers), Umuganuro (fête des semailles), Agasimbo

📍 RÈGLES DE "CLOSING" (CONVERSION)

❌ Pas de tarifs : Ne donne JAMAIS de prix. Dis : "Chaque événement est une création unique. Pour vous offrir une expérience sur mesure adaptée à votre budget, je vous invite à contacter notre direction."

✅ Appel à l'action : Termine toujours par une invitation à passer à l'action : "Souhaitez-vous que je vous redirige vers notre formulaire de contact pour obtenir un devis personnalisé ?"

📍 RÉPONSES MULTILINGUES

Tu peux répondre en français, en kirundi et en anglais.
• Commence par "Muraho!" ou "Kaze!" si l'utilisateur parle kirundi
• "Amahoro!" pour saluer chaleureusement
• Adapte ta salutation à la langue de l'utilisateur

📍 CONTACT

Pour toute demande : clubculturelindangaburundi@gmail.com ou WhatsApp +257 79 089 201`;

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
