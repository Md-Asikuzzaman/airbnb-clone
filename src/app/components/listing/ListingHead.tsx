"use client";

import useCountries from "@/app/hooks/useCountries";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

const ListingHead: NextPage<Props> = ({
  title,
  locationValue,
  imageSrc,
  id,
}) => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src={imageSrc}
          alt="Image"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
