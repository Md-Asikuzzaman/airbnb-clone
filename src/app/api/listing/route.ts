import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import listingSchema from "@/schema/listingSchema";
import { Listing } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  listing?: Listing;
  listings?: Listing[] | [];
  message?: string;
}

export async function POST(
  req: Request,
  res: Response
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized user!" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { success, data, error } = listingSchema.safeParse(body);

    if (!success || error) {
      const errorMessage = error
        ? error.errors.map((err) => err.message).join(", ")
        : "Invalid request";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const {
      title,
      description,
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
    } = data;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create listing" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  res: Response
): Promise<NextResponse<ApiResponse>> {
  try {
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   return NextResponse.json(
    //     { message: "Unauthorized user!" },
    //     { status: 401 }
    //   );
    // }

    const listings = await prisma.listing.findMany();

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}
