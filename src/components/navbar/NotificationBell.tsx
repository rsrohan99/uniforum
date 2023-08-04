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
        <SheetContent className="overflow-y-auto bg-background">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-gray-600">Notifications</SheetTitle>
          </SheetHeader>
          <div className="mt-10 flex flex-col gap-4">
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
