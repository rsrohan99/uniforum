'use client'

import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

interface NotificationCardProps {
  content: string
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  content,
}) => {
  return (
    <div
      className="flex h-20 w-full items-center gap-4 rounded-xl bg-white pl-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/01.png"/>
        <AvatarFallback className="bg-background">S</AvatarFallback>
      </Avatar>
      <div className="text-sm font-semibold tracking-wide text-gray-600">{content}</div>
    </div>
  );
}

export default NotificationCard;
