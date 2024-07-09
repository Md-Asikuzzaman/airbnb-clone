import prisma from "@/lib/prismadb";
import { Listing } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  message?: string;
  listing?: Listing | null;
}

interface ParamsType {
  params: {
    id: string;
  };
}

export async function GET(
  req: Request,
  context: ParamsType
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = context.params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 401 });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to find listing" },
      { status: 500 }
    );
  }
}
