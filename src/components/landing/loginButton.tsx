'use client'

import React, {useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {LogIn} from "lucide-react";
import {useSupabase} from "~/providers/supabase-provider";
import NProgress from "nprogress";


function LoginButton() {
  const router = useRouter()
  const supabase = useSupabase()
  const searchParams = useSearchParams()


  useEffect(() => {
    return () => {
      if (searchParams.toString()) {
        NProgress.start()
        NProgress.inc()
      } else NProgress.done()
      // console.log(searchParams.toString())
    };
  }, [searchParams]);
  

  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    NProgress.start()
    router.refresh()
  }

  return (
  <div onClick={handleSignInGoogle} className="mx-auto mt-24 flex max-w-fit cursor-pointer items-center gap-4 rounded-2xl px-12 py-2 text-sm font-semibold tracking-wider text-gray-600 ring-1 ring-accent2 hover:bg-accent2 hover:text-white"><span><LogIn size={18}/></span>Log in with Google</div>
  );
}

export default LoginButton;