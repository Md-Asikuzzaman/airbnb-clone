"use client";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { categories } from "@/lib/categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfDay,
} from "date-fns";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
interface Props {
  params: {
    id: string;
  };
}

// combile listing && user
type ListingWithUser = Listing & {
  user: User;
};

const Page: NextPage<Props> = ({ params: { id } }) => {
  const loginModal = useLoginModal();
  const queryClient = useQueryClient();

  const { data } = useSession();
  const currentUser = data?.user;

  // Fetch all listings
  const {
    data: listing,
    isLoading,
    isError,
  } = useQuery<ListingWithUser>({
    queryKey: ["listing", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/listing/${id}`, {
        baseURL: process.env.NEXTAUTH_URL,
      });
      return data.listing;
    },

    enabled: id ? true : false,
  });

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);

  // Set the initial date for select-dates
  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [totalPrice, setTotalPrice] = useState<number | undefined>(
    listing?.price
  );
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { data: reservations, isLoading: loading } = useQuery<Reservation[]>({
    queryKey: ["fetch_reservations"],
    queryFn: async () => {
      const { data } = await axios.get("/api/reservations");
      return data.reservations;
    },

    retryDelay: 1000,
  });

  // Check all disabled date based on reservation
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    if (reservations && Array.isArray(reservations)) {
      reservations?.map((reservation) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate),
        });

        dates = [...dates, ...range];
      });
    }

    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  // Create a new reservation
  const { mutate, isPending } = useMutation({
    mutationKey: ["add_reservation"],
    mutationFn: async (formData: any) => {
      const { data } = await axios.post("/api/reservations", formData, {
        baseURL: process.env.NEXTAUTH_URL,
      });
      return data.reservation;
    },

    onSuccess: async () => {
      toast.success("Reservation created!");
      await queryClient.invalidateQueries({
        queryKey: ["fetch_reservations"],
        type: "active",
        exact: true,
      });
    },
  });

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }

    console.log({
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    });

    mutate({
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    });
  }, [currentUser, loginModal, dateRange, listing, totalPrice, mutate]);

  const hasReservation1 =
    reservations &&
    Array.isArray(reservations) &&
    reservations?.some(
      (reservation) =>
        new Date(reservation.startDate).toLocaleDateString() ===
        initialDateRange.startDate?.toLocaleDateString()
    );

  const hasReservation2 =
    reservations &&
    Array.isArray(reservations) &&
    reservations?.some(
      (reservation) =>
        new Date(reservation.startDate).toLocaleDateString() ===
        dateRange.startDate?.toLocaleDateString()
    );

  // check api
  if (isError) {
    return <EmptyState />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            {listing && (
              <>
                <ListingHead
                  title={listing.title}
                  imageSrc={listing.imageSrc}
                  locationValue={listing.locationValue}
                  id={listing.id}
                />

                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  <ListingInfo
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                  />

                  <div className="order-first mb-10 md:order-last md:col-span-3 z-0">
                    <ListingReservation
                      price={listing.price}
                      totalPrice={totalPrice}
                      onChangeDate={(value) => setDateRange(value)}
                      dateRange={dateRange}
                      onSubmit={onCreateReservation}
                      disabledDates={disabledDates}
                      isPending={isPending}
                      disabled={
                        isPending || loading || !hasReservation2
                          ? hasReservation2
                          : hasReservation1
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
