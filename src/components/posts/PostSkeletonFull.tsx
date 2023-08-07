import React from 'react';
import { Skeleton } from "~/components/ui/skeleton"

const PostsSkeletonFull = () => {
  return (
    <div className="flex flex-col justify-items-start gap-3">
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
      <div
        className="rounded-xl bg-white p-5">
        <div className="mt-5 flex">
          <Skeleton className="h-6 w-2/5 rounded-xl" />
        </div>
        <div className="mt-5 flex">
          <Skeleton className="h-4 mb-2 w-3/5 rounded-xl" />
        </div>
        <div className="my-4">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
        </div>
        <div className="my-4 mt-7">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-3/5 rounded-lg" />
        </div>
      </div>

    </div>
  );
}

export default PostsSkeletonFull;
