import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  message?: string;
  user?: User;
}

interface ParamsType {
  params: {
    id: string;
  };
}

export async function POST(
  req: Request,
  context: ParamsType
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized user!" },
        { status: 401 }
      );
    }

    const { id } = context.params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 401 });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    const index = favoriteIds.indexOf(id);

    if (index === -1) {
      // Add the id to favorites if it's not already there
      favoriteIds.push(id);
    } else {
      // Remove the id from favorites if it's already there
      favoriteIds.splice(index, 1);
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add favorite" },
      { status: 500 }
    );
  }
}
