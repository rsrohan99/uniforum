// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import {serve} from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {OpenAIEmbeddings} from "https://esm.sh/langchain/embeddings/openai";

import {corsHeaders} from "../_shared/cors.ts";
import {Database} from "../_shared/database.types.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(
      "ok",
      {headers: corsHeaders}
    )
  }

  try {
    const {
      query
    } = await req.json();

    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: "No user logged in." }),
        {headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,}
      )
    }

    const model = new OpenAIEmbeddings();
    const queryEmbedding = await model.embedQuery(query);

    // Now we can get the session or user object
    const { data, error } = await supabaseClient
      .rpc('search', {
        query_embedding: queryEmbedding,
        match_threshold: 0.76,
        match_count: 20,
      })

    if (error) throw error;
    // console.log(data);
    const post_ids = data.map((row) => row.id);

    // user:user_id(full_name, profile_pic),

    return new Response(
      JSON.stringify(post_ids),
      // JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Search Error." }),
      {headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,}
    )
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
