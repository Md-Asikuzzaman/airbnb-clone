import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

interface ApiResponse {
  message?: string;
  users?: any;
}

export async function GET(
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

    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add favorite" },
      { status: 500 }
    );
  }
}
