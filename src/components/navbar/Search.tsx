import React from "react";
import {Input} from "~/components/ui/input";
import {Search as SearchIcon} from "lucide-react"
// import {Label} from "~/components/ui/label";

const Search = () => {
  return (
    <div className="grid w-full max-w-xl items-center">
      <div className="flex items-center pl-3 mx-5 bg-background rounded-3xl">
        <SearchIcon size={18} className="text-muted-foreground"/>
        <Input
          className="h-7 py-1 mx-6 text-muted-foreground placeholder:text-center focus-visible:ring-0 focus-visible:ring-offset-0"
          id="search" placeholder="Search" />
      </div>
    </div>
  );
}

export default Search;