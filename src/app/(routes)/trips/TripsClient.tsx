"use client";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listing/ListingCard";
import { Listing, Reservation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";

interface Props {
  userId: string;
}

const TripsClient: NextPage<Props> = ({ userId }) => {
  const { data: reservations } = useQuery({
    queryKey: ["get_reservations"],
    queryFn: async () => {
      const { data } = await axios.get("/api/reservations");
      return data.reservations;
    },
  });

  if (reservations?.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Look like you havent reserved ant trips."
      />
    );
  }

  console.log(reservations);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation}
            reservation={reservation}
            currentUser={userId}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
