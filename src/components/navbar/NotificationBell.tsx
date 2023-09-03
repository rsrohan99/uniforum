'use client'

import React, {useEffect, useState} from "react";
import {BellRing} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import NotificationCard from "~/components/notification/NotificationCard";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import {useTriggerNotificationsRefresh} from "~/hooks/useTriggerNotificationRefresh";

interface INotification {
  id: string,
  content: string,
  link: string,
  is_read: boolean
}

const NotificationBell = () => {

  const supabase = useSupabase()
  const session = useSession()

  const [notifications, setNotifications] = useState<INotification[]>([])

  const {triggerNotificationsRefresh, toggleTriggerNotificationsRefresh} = useTriggerNotificationsRefresh();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    return () => {
      const getNotifications = async () => {
        const {data} = await supabase
          .from('notifications')
          .select('id, content, link, is_read')
          .eq('user_id', session?.user.id)
          .order('date_notified', {ascending: false})
        setNotifications((data as INotification[]) || [])
      }
      getNotifications();
    };
  }, [hasMounted, triggerNotificationsRefresh]);



  return (
    <>
      <Sheet>
        <SheetTrigger>
          <BellRing onClick={toggleTriggerNotificationsRefresh} size={18} className="cursor-pointer text-muted-foreground"/>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto bg-background">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-gray-600">Notifications</SheetTitle>
          </SheetHeader>
          <div className="mt-10 flex flex-col gap-4">
            {notifications.map(notification => (
              <SheetTrigger key={notification.id}>
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  content={notification.content}
                  link={notification.link}
                  is_read={notification.is_read}/>
              </SheetTrigger>
            ))}
            {/*<NotificationCard content={"@susanne replied to you"} link={link} />*/}
            {/*<NotificationCard content={"New Announcement from BUET/CSE/CSE301"}/>*/}
            {/*<NotificationCard content={"Your poll has updates"}/>*/}
            {/*<NotificationCard content={"@theo replied to your q&a post"}/>*/}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default NotificationBell;
