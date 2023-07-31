import React from "react";
import {Button} from "~/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";

const MidButtons = () => {
  return (
    <>
      <div className="flex items-center justify-between pt-24 mx-auto w-7/12">
        <div className="flex gap-4 items-center">
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
            <DropdownMenuContent className="w-20 rounded-xl font-semibold text-muted-foreground" align="start" forceMount>
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
          >Create Post</Button>
        </div>
      </div>
    </>
  );
}

export default MidButtons;
