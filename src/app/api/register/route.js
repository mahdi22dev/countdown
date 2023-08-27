import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismClient";

export async function POST(req) {
  const data = await req.json();
  const { username, email, password } = data.data;

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "correct the required data" },
      { status: 401 }
    );
  }
  // check if user exist
  const existingUser = await prisma.user.findUnique({
    where: { email: data.data.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "this user already exist" },
      { status: 401 }
    );
  }
  //dycrpt new user pass
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds

  // add user to database

  try {
    const newUser = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        image: null,
      },
    });

    return NextResponse.json(
      { message: "User Saved", newUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error saving user" }, { status: 400 });
  }
}
