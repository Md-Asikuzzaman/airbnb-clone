"use client";

import { NextPage } from "next";
import { AiOutlineHeart } from "react-icons/ai";

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
      <AiOutlineHeart />
    </div>
  );
};

export default HeartButton;
