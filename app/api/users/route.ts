import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const res = await fetch('http://jsonplaceholder.typicode.com/users');
    const users: userType[] = await res.json();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something wrong!' }, { status: 500 });
  }
}
