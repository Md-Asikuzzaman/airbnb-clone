"use client";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listing/ListingHead";
import { Listing } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";

interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = ({ params: { id } }) => {
  const {
    data: listing,
    isLoading,
    isError,
  } = useQuery<Listing>({
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
              <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
