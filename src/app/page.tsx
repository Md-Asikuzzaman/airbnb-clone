"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Listing } from "@prisma/client";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listing/ListingCard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const { data: listings, isLoading } = useQuery<Listing[]>({
    queryKey: ["fetch_listings"],
    queryFn: async () => {
      const { data } = await axios.get("/api/listing", {
        baseURL: process.env.NEXTAUTH_URL,
      });

      return data.listings;
    },
  });

  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {isLoading && "Loading..."}
          {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              currentUser={session?.user}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
