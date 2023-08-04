'use client'

import React from "react";
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
import {useSupabase} from "~/providers/supabase-provider";


const UserMenu = () => {
  const router = useRouter();
  const supabase = useSupabase()

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    // router.refresh();
    router.replace('/')
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
              <AvatarImage src="/avatars/01.png"/>
              <AvatarFallback className="bg-background">RS</AvatarFallback>
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
