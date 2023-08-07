'use client'

import React, {useState} from "react";
import {Input} from "~/components/ui/input";
import {Search as SearchIcon} from "lucide-react"
import {useRouter} from "next/navigation";
import {useSession} from "~/providers/supabase-provider";
import toast from "react-hot-toast";
import {showErrorToast} from "~/components/posts/Compose";
import {usePostsHook} from "~/hooks/usePosts";
import {useSearchQueryHook} from "~/hooks/useSearchQuery";

const Search = () => {
  const router = useRouter()
  const {setQuery, getLatestQuery} = useSearchQueryHook()
  // const [query, setQuery] = useState("")
  const session = useSession()
  const {setPostIds, getLatestPostIds} = usePostsHook()
  const handleKeyDown = async (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      if (!getLatestQuery()) {
        // console.log('running yeah')
        // setPostIds([])
        return
      }
      // if (!getLatestQuery()) return;
      const jwt = session?.access_token || "";
      // console.log(jwt)
      const response = await fetch(`${process.env.NEXT_PUBLIC_EDGE_URL}/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getLatestQuery()
        }),
      })
      const resp_json = await response.json()
      if (response.status === 200) {
        router.replace('/app')
        setPostIds(resp_json)
      } else showErrorToast(resp_json.error)
    }
  }
  return (
    <div className="grid w-full max-w-2xl items-center">
      <div className="mx-5 flex items-center rounded-3xl pl-3 bg-background">
        <SearchIcon size={18} className="text-muted-foreground"/>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          value={getLatestQuery()}
          onKeyDown={handleKeyDown}
          className="mx-6 h-7 placeholder:text-center text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          id="search" placeholder="Search" />
      </div>
    </div>
  );
}

export default Search;