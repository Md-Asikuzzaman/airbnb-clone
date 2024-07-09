"use client";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import { categories } from "@/lib/categories";
import { Listing, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useMemo } from "react";

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

  console.log(listing);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing?.category);
  }, [listing?.category]);

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

                <div className="grid grid-col-1 md:grid-col-7 md:gap-10 mt-6">
                  <ListingInfo
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                  />
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
