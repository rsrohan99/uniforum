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
  <div onClick={handleSignInGoogle} className="flex gap-4 items-center mx-auto mt-24 max-w-fit rounded-2xl cursor-pointer hover:bg-accent2 hover:text-white px-12 font-semibold tracking-wider py-2 text-sm text-gray-600 ring-1 ring-accent2"><span><LogIn size={18}/></span>Log in with Google</div>
  );
}

export default LoginButton;