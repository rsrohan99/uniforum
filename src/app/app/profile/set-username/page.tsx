'use client'

import {Input} from "~/components/ui/input.tsx";
import React, {useEffect, useState} from "react";
import {Button} from "~/components/ui/button.tsx";
import {useSession, useSupabase} from "~/providers/supabase-provider.tsx";
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation";

const SetUsernamePage = () => {
  const supabase = useSupabase();
  const session = useSession();
  const router = useRouter()
  const [username, setUsername] = useState("")


  const showErrorToast = (message:string) => {
    toast.error(message, {
      position: "bottom-right"
    })
  }
  const handleSetUsername = async () => {
    if (!username) {
      showErrorToast("Enter your username first")
      return
    }
    const user = session?.user
    if (!user) {
      showErrorToast("Oops! You need to login first")
      return
    }
    const {data: username_data, error: username_error} = await supabase
      .from('uni_users')
      .select('username')
      .eq('username', username)
    if (username_error) {
      showErrorToast("Oops! Unexpected Error. We'll fix it soon")
      return
    }
    if (username_data && username_data?.length > 0) showErrorToast("Username already exists. Try another one.")
    else {
      const {error: set_username_error} = await supabase
        .from('uni_users')
        .update({'username': username, 'is_first_time': false})
        .eq('user_id', user.id)
      if (set_username_error) {
        showErrorToast("Oops! Unexpected Error. We'll fix it soon")
        console.log(set_username_error)
      }
      else {
        toast.success("Username changed successfully.", {
          position: "bottom-right"
        })
        router.replace('/app')
      }
    }
  }
  return (
    <div className='flex flex-col gap-2 mt-10'>
      <div className='text-2xl mb-5 text-center p-4 text-muted-foreground tracking-wide font-semibold'>
        {/*Enter your unique username*/}
        Let's setup your unique username for the first time
      </div>
      <Input onChange={(e) => setUsername(e.target.value)}
        className="px-10 mx-auto w-3/4 h-8 placeholder:text-center text-sm tracking-wide bg-white rounded-xl text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        id="username" placeholder="Username" />
      <Button onClick={handleSetUsername}
        className=" px-7 py-3 mx-auto w-3/4 mt-4 h-7 border-accent2 border-2 rounded-xl bg-background hover:bg-accent2 hover:text-white tracking-wider font-bold text-sm text-gray-500"
      >Set Username</Button>

    </div>
  )
};
export default SetUsernamePage;
