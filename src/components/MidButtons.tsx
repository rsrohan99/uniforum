'use client'

import React from "react";
import {Button} from "~/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {ChevronDown, PenLine} from "lucide-react";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import {usePostSorting} from "~/hooks/usePostSorting";

const MidButtons = () => {
  const router = useRouter()
  const {setSortOrder, getLatestSortOrder} = usePostSorting()
  return (
    <>
      <div className="mx-auto flex w-10/12 flex-wrap items-center justify-between gap-4 pt-20 md:pt-24 lg:w-7/12 lg:flex-nowrap">
        <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
          <Button
            onClick={() => setSortOrder("new")}
            className={`px-7 h-8 rounded-xl ${getLatestSortOrder()==="new"?"bg-accent2 text-white":"bg-white text-gray-500"} tracking-wider font-bold hover:bg-accent2 hover:text-white`}
          >New</Button>
          <Button
            onClick={() => setSortOrder("top")}
            className={`px-7 h-8 rounded-xl ${getLatestSortOrder()==="top"?"bg-accent2 text-white":"bg-white text-gray-500"} hover:bg-accent2 hover:text-white tracking-wider font-bold`}
          >Top</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="px-7 h-8 rounded-xl bg-white hover:bg-accent2 hover:text-white tracking-wider font-bold focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-500"
              >Today <span
                className="
                  ml-2 mt-1
              "><ChevronDown size={18}/></span></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 rounded-xl font-medium text-muted-foreground" align="start" forceMount>
                <DropdownMenuItem>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem>
                  This week
                </DropdownMenuItem>
                <DropdownMenuItem>
                  This month
                </DropdownMenuItem>
                <DropdownMenuItem>
                  This year
                </DropdownMenuItem>
              <DropdownMenuItem>
                All time
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="
              px-7
              h-8
              rounded-xl
              bg-white
              hover:bg-accent2
              hover:text-white
              tracking-wider
              font-bold
              focus-visible:ring-0 focus-visible:ring-offset-0
              text-gray-500"
              ><span
                className="
                  mr-2 mt-1
              "><PenLine size={18}/></span>Create Post<span
                className="
                  ml-2 mt-1
              "><ChevronDown size={18}/></span></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 rounded-xl font-medium text-muted-foreground" align="center" forceMount>
              <DropdownMenuItem onClick={() => {
                NProgress.start()
                router.push('/app/posts/compose/discussion')
              }}>
                Discussion
              </DropdownMenuItem>
              <DropdownMenuItem>
                Announcement
              </DropdownMenuItem>
              <DropdownMenuItem>
                Q&A
              </DropdownMenuItem>
              <DropdownMenuItem>
                Poll
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default MidButtons;
