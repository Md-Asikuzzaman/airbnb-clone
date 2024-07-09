"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { NextPage } from "next";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { eachDayOfInterval } from "date-fns";
import { useSession } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const Map = dynamic(() => import("./../MyMap"), {
  ssr: false,
});

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface Props {
  user: User;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  // removeable
  reservations?: Reservation[];
  price: number;
}

const ListingInfo: NextPage<Props> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  // removeable
  reservations = [],
  price,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  const { data } = useSession();
  const currentUser = data?.user;

  const loginModal = useLoginModal();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  console.log(disabledDates);

  const [totalProce, setTotalProce] = useState<number>(price);
  const [dataRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
  }, [currentUser, loginModal]);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />

      {category && (
        <ListingCategory
          icon={category?.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />

      <div className="h-[300px]">
        <Map latlng={coordinates} />
      </div>
    </div>
  );
};

export default ListingInfo;
