'use client'

import React from "react";
import {Button} from "~/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {ChevronDown, PenLine} from "lucide-react";

const MidButtons = () => {
  return (
    <>
      <div className="mx-auto flex flex-wrap lg:flex-nowrap gap-4 w-10/12 lg:w-7/12 items-center justify-between pt-20 md:pt-24">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
          <Button
            className="
              px-7
              h-8
              rounded-xl
              bg-white
              tracking-wider
              font-bold
              hover:bg-accent2
              hover:text-white
              bg-accent2
              text-white"
          >New</Button>
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
              text-gray-500"
          >Top</Button>
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
              <DropdownMenuItem>
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
