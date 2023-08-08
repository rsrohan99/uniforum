'use client'

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {LogIn} from "lucide-react";
import {useSupabase} from "~/providers/supabase-provider";
import NProgress from "nprogress";
import toast from "react-hot-toast";


function LoginButton() {
  const router = useRouter()
  const supabase = useSupabase()
  const searchParams = useSearchParams()

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    NProgress.done()
  }, [])

  useEffect(() => {
    return () => {
      console.log(searchParams.toString())
      if (searchParams.toString()) {
        toast.loading("Logging you in...", {id: 'login'})
        NProgress.start()
        NProgress.inc()
      } else NProgress.done()
    };
  }, [searchParams]);
  

  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    NProgress.start()
    toast.loading("Logging you in...", {id: 'login'})
    router.refresh()
  }

  return (
  <div onClick={handleSignInGoogle} className="mx-auto mt-24 flex max-w-fit cursor-pointer items-center gap-4 rounded-2xl px-12 py-2 text-sm font-semibold tracking-wider text-gray-600 ring-1 ring-accent2 hover:bg-accent2 hover:text-white"><span><LogIn size={18}/></span>Log in with Google</div>
  );
}

export default LoginButton;