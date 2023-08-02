import React from "react";
import {Input} from "~/components/ui/input";
import {Search as SearchIcon} from "lucide-react"

const Search = () => {
  return (
    <div className="grid w-full max-w-2xl items-center">
      <div className="mx-5 flex items-center rounded-3xl pl-3 bg-background">
        <SearchIcon size={18} className="text-muted-foreground"/>
        <Input
          className="mx-6 h-7 placeholder:text-center text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          id="search" placeholder="Search" />
      </div>
    </div>
  );
}

export default Search;