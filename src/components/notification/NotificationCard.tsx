'use client'

import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import {useSupabase} from "~/providers/supabase-provider";
import {useTriggerNotificationsRefresh} from "~/hooks/useTriggerNotificationRefresh";

interface NotificationCardProps {
  id: string,
  content: string,
  link: string,
  is_read: boolean
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  content,
  link,
  is_read,
  id
}) => {
  const router = useRouter()
  const supabase = useSupabase();

  const {toggleTriggerNotificationsRefresh} = useTriggerNotificationsRefresh();

  const readNotification = async () => {
    await supabase
      .from('notifications')
      .update({is_read: true})
      .eq('id', id)
    toggleTriggerNotificationsRefresh()
  }

  return (
    <div
      onClick={() => {
        router.push(`/app/posts/${link}`)
        NProgress.start()
        readNotification()
      }}
      className={`flex h-20 w-full items-center gap-4 rounded-xl bg-white pl-4 cursor-pointer ${!is_read? "ring-1 ring-accent2" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/01.png"/>
        <AvatarFallback className="bg-background">{content.match(/[a-zA-Z]/)[0].toUpperCase() || "S"}</AvatarFallback>
      </Avatar>
      <div
        className={`text-sm ${is_read? "": "font-semibold tracking-wide"} text-gray-600`}>{content}</div>
    </div>
  );
}

export default NotificationCard;
