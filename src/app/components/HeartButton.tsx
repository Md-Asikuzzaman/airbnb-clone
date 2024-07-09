"use client";

import clsx from "clsx";
import { NextPage } from "next";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  listingId: string;
  currentUser: any;
}

const HeartButton: NextPage<Props> = ({ listingId, currentUser }) => {
  const queryClient = useQueryClient();

  const { data: users } = useQuery<User>({
    queryKey: ["fetch_user", currentUser.id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/users/${currentUser.id}`);
      return data.users;
    },

    enabled: currentUser ? true : false,
  });

  const isFav = users?.favoriteIds.includes(listingId);

  const { mutate } = useMutation({
    mutationKey: ["favorite"],
    mutationFn: async (id: string) => {
      const { data } = await axios.post(`/api/favorites/${id}`);

      return data.user as User;
    },

    onSuccess: () => {
      toast.success("Success!");
      queryClient.invalidateQueries({
        queryKey: ["fetch_user"],
      });
    },
  });

  return (
    <div
      onClick={() => mutate(listingId)}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={isFav ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
