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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Tu es l'assistant culturel INDANGABURUNDI, un guide expert et respectueux de la culture burundaise.

Tu dois:
- Répondre aux questions sur la culture, les traditions, l'histoire, la musique, les danses et la sagesse du Burundi
- Être pédagogique et inspirant dans tes explications
- Pouvoir répondre en français, en kirundi et en anglais
- Contextualiser et expliquer les traditions, jamais les présenter comme du folklore exotique
- Rester factuel et respectueux des traditions

Informations clés sur le Burundi:
- Les Tambourinaires du Burundi (Ingoma) sont inscrits au patrimoine immatériel de l'UNESCO
- Le "Ubuntu" (Je suis parce que nous sommes) est une philosophie centrale
- Les danses traditionnelles incluent: Intore (danse des guerriers), Umuganuro (fête des semailles), Agasimbo
- Les proverbes kirundi transmettent la sagesse ancestrale
- Le kirundi est la langue nationale, avec le français comme langue officielle

Commence toujours par "Muraho!" si l'utilisateur parle kirundi, sinon adapte ta salutation à sa langue.`;

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
