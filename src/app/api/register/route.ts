import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import registerSchema from "@/schema/registerSchema";

interface ApiResponse {
  message?: string;
  user?: User;
}

export async function POST(
  req: Request,
  res: Response
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const { success, data, error } = registerSchema.safeParse(body);

    if (!success || error) {
      const errorMessage = error
        ? error.errors.map((err) => err.message).join(", ")
        : "Invalid request";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  const users = await prisma.user.findMany();

  return NextResponse.json({ users });
}
