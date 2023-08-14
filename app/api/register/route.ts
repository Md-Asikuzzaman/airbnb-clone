import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import { prisma } from '@/app/libs/db';

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, hashedPassword },
  });

  return NextResponse.json(user, { status: 201 });
}
