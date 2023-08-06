'use client'

import React from 'react';
import {useRouter} from "next/navigation";
import {LogIn} from "lucide-react";
import {useSupabase} from "~/providers/supabase-provider";


function LoginButton() {
  const router = useRouter()
  const supabase = useSupabase()

  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    router.refresh()
  }

  return (
  <div onClick={handleSignInGoogle} className="mx-auto mt-24 flex max-w-fit cursor-pointer items-center gap-4 rounded-2xl px-12 py-2 text-sm font-semibold tracking-wider text-gray-600 ring-1 ring-accent2 hover:bg-accent2 hover:text-white"><span><LogIn size={18}/></span>Log in with Google</div>
  );
}

export default LoginButton;