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
    const { name, email, password } = await req.json();

    const { success, data, error } = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!success || error) {
      const errorMessage = error
        ? error.errors.map((err) => err.message).join(", ")
        : "Invalid request";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
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
        name: data.name,
        email: data.email,
        hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
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
