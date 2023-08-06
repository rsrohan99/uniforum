'use client'
import React from 'react';
import {useSession} from "~/providers/supabase-provider";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

async function ProfileAvatar() {
  const session = useSession();
  const defaultAvatarUrl = '/images/placeholder.jpg'

  return (
    <div className="flex flex-col gap-4 items-start">
      <Avatar className="h-28 w-28 border-[5px] border-accent2">
        <AvatarImage src={session?.user.user_metadata.avatar_url || defaultAvatarUrl} />
        <AvatarFallback>{session?.user.user_metadata.full_name.split(' ')[0] || "U"}</AvatarFallback>
      </Avatar>
      <div className="ml-2 text-xl text-gray-500 font-bold">{session?.user.user_metadata.full_name}</div>
    </div>
  );
}

export default ProfileAvatar;