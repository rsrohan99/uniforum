import React from 'react';
import { Skeleton } from "~/components/ui/skeleton"

const PostsSkeleton = () => {
  return (
    <div
      className="rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-24 rounded-xl" />
      </div>
      <div className="mt-5 flex">
        <Skeleton className="h-6 w-2/5 rounded-xl" />
      </div>
      <div className="my-4">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
      </div>
    </div>
    // <div className="rounded-xl bg-white p-5">
    //   <Skeleton className="h-12 w-12 rounded-full" />
    //   <div className="space-y-2">
    //     <Skeleton className="h-4 w-[250px]" />
    //     <Skeleton className="h-4 w-[200px]" />
    //   </div>
    // </div>
  );
}

export default PostsSkeleton;