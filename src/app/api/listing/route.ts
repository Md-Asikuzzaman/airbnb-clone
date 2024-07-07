import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import rentSchema from "@/schema/rentSchema";
import { Listing } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  listing?: Listing;
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
    const { success, data, error } = rentSchema.safeParse(body);

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
