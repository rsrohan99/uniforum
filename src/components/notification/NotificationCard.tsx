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
      className="flex gap-4 w-full h-20 pl-4 items-center bg-white rounded-xl">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/01.png"/>
        <AvatarFallback className="bg-background">S</AvatarFallback>
      </Avatar>
      <div className="font-semibold text-sm tracking-wide">{content}</div>
    </div>
  );
}

export default NotificationCard;
