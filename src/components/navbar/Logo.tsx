'use client'
import {useRouter} from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="text-lg cursor-pointer tracking-widest" onClick={() => router.push('/')}>
      Uni<span className="font-black text-gray-600">Forum</span>
    </div>
  );
}

export default Logo;