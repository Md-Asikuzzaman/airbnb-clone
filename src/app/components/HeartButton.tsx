"use client";

import clsx from "clsx";
import { NextPage } from "next";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  listingId: string;
  currentUser: string;
}

const HeartButton: NextPage<Props> = ({ listingId, currentUser }) => {
  const hasFavorited = false;
  const togglefavorite = () => {};

  return (
    <div
      onClick={togglefavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
