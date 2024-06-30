"use client";

import Image from "next/image";
import { memo } from "react";

const Avatar = () => {
  console.log("from avatar");

  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={"/images/avatar.jpg"}
    />
  );
};

export default memo(Avatar);
