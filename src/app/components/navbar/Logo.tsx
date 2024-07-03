"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="h-[30px] w-[100px] relative">
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        fill
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
