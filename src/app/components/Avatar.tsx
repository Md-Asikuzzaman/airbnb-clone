"use client";

import { NextPage } from "next";
import Image from "next/image";
import { memo } from "react";
interface Props {
  src?: string | null;
}

const Avatar: NextPage<Props> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src ?? "/images/avatar.jpg"}
    />
  );
};

export default memo(Avatar);
