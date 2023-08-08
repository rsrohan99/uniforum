'use client'
import {usePathname, useRouter} from "next/navigation";
import { cn } from "~/utils/utils"
import React from "react";
import {useSearchQueryHook} from "~/hooks/useSearchQuery";
import {usePostsHook} from "~/hooks/usePosts";
import NProgress from "nprogress";

interface CNProps {
  className?: string | undefined
}
const Logo: React.FC<CNProps> = ({className}) => {
  const router = useRouter();
  const pathname = usePathname()
  const {setQuery} = useSearchQueryHook()
  const {setPostIds} = usePostsHook()
  return (
    <div className={cn("text-lg cursor-pointer tracking-widest", className)} onClick={() => {
      if (pathname !== '/app') NProgress.start()
      setQuery("")
      setPostIds([])
      router.push('/app')
    }}>
      Uni<span className="font-black text-gray-600">Forum</span>
    </div>
  );
}

export default Logo;