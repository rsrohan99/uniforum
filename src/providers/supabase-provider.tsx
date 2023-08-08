'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {Database} from "../../supabase/functions/_shared/database.types.ts";

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<any, string>
  session: MaybeSession
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
                                           children,
                                           session,
                                         }: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.access_token !== session?.access_token) {
        if (event == 'SIGNED_IN') router.replace('/app')
        // console.log(event, _session);
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase, session])

  return (
    <Context.Provider value={{ supabase, session }}>
  <>{children}</>
  </Context.Provider>
)
}

export const useSupabase = <
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database
>() => {
  let context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context.supabase as SupabaseClient<Database, SchemaName>
}

export const useSession = () => {
  let context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSession must be used inside SupabaseProvider')
  }

  return context.session
}

// export const useUniUser = async () => {
//   let context = useContext(Context)
//
//   if (context === undefined) {
//     throw new Error('useSession must be used inside SupabaseProvider')
//   }
//
//   const session = context.session
//   const supabase = context.supabase
//   if (session) {
//     const {data:user_data} = await supabase
//       .from('uni_user')
//       .select('*')
//       .eq('user_id', session.user.id)
//     if (user_data && user_data[0]) return user_data[0]
//   } else return null;
// }
