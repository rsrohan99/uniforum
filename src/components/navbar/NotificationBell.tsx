import React from "react";
import {BellRing} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import NotificationCard from "~/components/notification/NotificationCard";

const NotificationBell = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <BellRing size={18} className="cursor-pointer text-muted-foreground"/>
        </SheetTrigger>
        <SheetContent className="bg-background overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-bold text-gray-600 text-2xl">Notifications</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-10">
            <NotificationCard content={"@susanne replied to you"}/>
            <NotificationCard content={"New Announcement from BUET/CSE/CSE301"}/>
            <NotificationCard content={"Your poll has updates"}/>
            <NotificationCard content={"@theo replied to your q&a post"}/>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default NotificationBell;
