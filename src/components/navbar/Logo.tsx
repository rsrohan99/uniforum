'use client'
import {useRouter} from "next/navigation";
import { cn } from "~/utils/utils"
import React from "react";

interface CNProps {
  className?: string | undefined
}
const Logo: React.FC<CNProps> = ({className}) => {
  const router = useRouter();
  return (
    <div className={cn("text-lg cursor-pointer tracking-widest", className)} onClick={() => router.push('/app')}>
      Uni<span className="font-black text-gray-600">Forum</span>
    </div>
  );
}

export default Logo;