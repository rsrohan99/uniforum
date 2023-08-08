'use client'

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import NotificationBell from "~/components/navbar/NotificationBell";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import toast from "react-hot-toast";
import NProgress from "nprogress";


const UserMenu = () => {
  const router = useRouter();
  const supabase = useSupabase()
  const currentSession = useSession()
  const defaultAvatarUrl = '/images/placeholder.jpg'
  // const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl)

  // useEffect(() => {
  //   // console.log(currentSession?.user)
  //   setAvatarUrl(currentSession?.user.user_metadata.avatar_url || defaultAvatarUrl)
  // }, [currentSession])

  const handleSignOut = async () => {
    toast.loading("Logging out...", {id:'logout'})
    const {error} = await supabase.auth.signOut();
    toast.remove('logout')
    NProgress.start()
    // router.refresh();
    router.push('/')
  }


  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">

      <NotificationBell/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="
            relative
            h-8 w-8
            rounded-full
            focus-visible:ring-0 focus-visible:ring-offset-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentSession?.user.user_metadata.avatar_url || defaultAvatarUrl} />
              <AvatarFallback>{currentSession?.user.user_metadata.full_name.split(' ')[0] || "U"}</AvatarFallback>
              {/*<AvatarImage src="/avatars/01.png"/>*/}
              {/*<AvatarFallback className="bg-background">RS</AvatarFallback>*/}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Rohan</p>
              <p className="text-xs leading-none text-muted-foreground">
                @rsrohan
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/app/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Bookmarks
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
