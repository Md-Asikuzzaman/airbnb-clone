import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import reservationSchema from "@/schema/reservationSchema";
import { Listing, Reservation } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  message?: string;
  reservation?: Listing;
  reservations?: Listing[];
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
    const { success, data, error } = reservationSchema.safeParse(body);

    if (!success || error) {
      const errorMessage = error
        ? error.errors.map((err) => err.message).join(", ")
        : "Invalid request";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const { listingId, startDate, endDate, totalPrice } = data;

    const reservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create listing" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  const reservations = await prisma.reservation.findMany({
    include: {
      listing: true,
    },
  });

  return NextResponse.json({ reservations });
}
