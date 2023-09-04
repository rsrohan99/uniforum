'use client'

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import NotificationBell from "~/components/navbar/NotificationBell";
import {useSession, useSupabase} from "~/providers/supabase-provider";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import {useSignedIn} from "~/hooks/useSignedIn";
import {useBookmarks} from "~/hooks/useBookmarks";


const UserMenu = () => {
  const router = useRouter();
  const supabase = useSupabase()
  const currentSession = useSession()
  const defaultAvatarUrl = '/images/placeholder.jpg'
  const {setSignedIn} = useSignedIn()
  const {setBookmarks, getLatestBookmarks} = useBookmarks()
  // const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl)

  // useEffect(() => {
  //   // console.log(currentSession?.user)
  //   setAvatarUrl(currentSession?.user.user_metadata.avatar_url || defaultAvatarUrl)
  // }, [currentSession])

  const handleSignOut = async () => {
    toast.loading("Logging out...", {id:'logout'})
    const {error} = await supabase.auth.signOut();
    toast.remove('logout')
    NProgress.start()
    setSignedIn(false)
    localStorage.setItem('signedIn', "")
    // router.refresh();
    router.push('/')
  }

  // let queryBuilder1 = useSupabase
  // .from('bookmarks')
  // .select(`post_id(
  //   id,
  //   user: user_id(user_id, username, profile_pic),
    
  // )`)
  // .eq('user_id', useSession?.user.id)
  const getTotalVotes = async () => {
    const {data:data1} = await supabase
      .from('posts')
      .select('votes_count')
      .eq('user_id', currentSession?.user.id)
    // console.log(data1)
    let _totalVotes = 0
    for (let votecount of data1) {
      _totalVotes += votecount.votes_count
    }
    setTotalVotes(_totalVotes)
  }
  const getPostsCommented = async () => {
    const {data} = await supabase
      .from('comments')
      .select('post_id')
      .eq('user_id', currentSession?.user.id)
    const listPosts = data?.map(post => (post.post_id as string))
    // console.log(listPosts)
    // console.log(listPosts.length)
    const uniquePosts = new Set(listPosts)
    // console.log(uniquePosts.size)
    setPostsCommented(uniquePosts.size)
  }

  const getCommentsReceived = async () => {
    const {data:postsData} = await supabase
      .from('posts')
      .select('id')
      .eq('user_id', currentSession?.user.id)

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-5">

      <NotificationBell/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="
            relative
            h-8 w-8
            rounded-full
            focus-visible:ring-0 focus-visible:ring-offset-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentSession?.user.user_metadata.avatar_url || defaultAvatarUrl} />
              <AvatarFallback>{currentSession?.user.user_metadata.full_name.split(' ')[0] || "U"}</AvatarFallback>
              {/*<AvatarImage src="/avatars/01.png"/>*/}
              {/*<AvatarFallback className="bg-background">RS</AvatarFallback>*/}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Rohan</p>
              <p className="text-xs leading-none text-muted-foreground">
                @rsrohan99
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/*<DropdownMenuItem onClick={() => {*/}
            {/*  router.push('/app/profile')*/}
            {/*  NProgress.start()*/}
            {/*}}>*/}
            {/*  Profile*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuItem onClick={() => {
              router.push('/app')
              setBookmarks(!getLatestBookmarks())
              NProgress.start()
            }}>
              Bookmarks
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              router.push('/app/profile/courses')
              NProgress.start()
            }}>
              Courses
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            Votes_Count
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
