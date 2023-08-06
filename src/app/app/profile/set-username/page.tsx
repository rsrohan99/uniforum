'use client'

import {Input} from "~/components/ui/input";
import React, {useState} from "react";
import {Button} from "~/components/ui/button";
import {useSession, useSupabase} from "~/providers/supabase-provider";
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
    <div className='mt-10 flex flex-col gap-2'>
      <div className='mb-5 p-4 text-center text-2xl font-semibold tracking-wide text-muted-foreground'>
        {/*Enter your unique username*/}
        Let's setup your unique username for the first time
      </div>
      <Input onChange={(e) => setUsername(e.target.value)}
        className="mx-auto h-8 w-3/4 rounded-xl bg-white px-10 placeholder:text-center text-sm tracking-wide text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        id="username" placeholder="Username" />
      <Button onClick={handleSetUsername}
        className="mx-auto mt-4 h-7 w-3/4 rounded-xl border-2 px-7 py-3 text-sm font-bold tracking-wider text-gray-500 border-accent2 bg-background hover:bg-accent2 hover:text-white"
      >Set Username</Button>

    </div>
  )
};
export default SetUsernamePage;
