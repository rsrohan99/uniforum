// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {OpenAIEmbeddings} from "https://esm.sh/langchain/embeddings/openai";
import {corsHeaders} from "../_shared/cors.ts";
import type {Database} from "../_shared/database.types.ts"



serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(
      "ok",
      {headers: corsHeaders}
    )
  }

  try {
    const {
      title,
      subtitle,
      content,
      uni,
      department,
      course,
      post_type
    } = await req.json();

    let university = uni.toLowerCase()
    let dept = department.toLowerCase()
    let cours = course.toLowerCase()
    if (!dept) {
      dept = `${university}_all_~`
      cours = `${university}_all_~`
    } else if (!cours) cours = `${dept}_all_~`

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
    const descriptionToEmbed = `${title}
---
${subtitle}
---
${content}`

    // console.log(descriptionToEmbed);
    // return new Response("Ok");
    const contentEmbedding = await model.embedQuery(descriptionToEmbed);


    // const user_uid = user.id;

    const { data, error } = await supabaseClient
      .rpc('insert_post', {
        p_content: content,
        p_content_embedding: contentEmbedding,
        p_user_id: user.id,
        p_title: title,
        p_subtitle: subtitle,
        p_post_type: post_type,
        p_course: cours,
        p_department: dept,
        p_uni: university
      })

    // console.log("should've called it");
    console.log(error);

    if (error) {
      // return new Response(JSON.stringify({ error: "Error while posting, try again" }),
      return new Response(JSON.stringify({ error: error.message }),
        {headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,}
      )
    }


    // And we can run queries in the context of our authenticated user
    // const { data, error } = await supabaseClient.from('users').select('*')
    // if (error) throw error
    return new Response(
      JSON.stringify({message: "Posted successfully."}),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }),
    // return new Response(JSON.stringify({ error: "Error while posting, try again." }),
      {headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,}
    )
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
