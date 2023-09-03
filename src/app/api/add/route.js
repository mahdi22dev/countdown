import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = "64e9d74fd86bcdd666310046";
  const newCountdownData = {
    title: "Upcoming Event",
    targetDate: new Date("2023-12-31"),
  };

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    console.error("User not found");
  } else {
    const newCountdown = await prisma.userCountdown.create({
      data: {
        ...newCountdownData,
        userId: existingUser.id,
      },
    });

    console.log("Countdown added to the user:", newCountdown);
  }
  return NextResponse.json({ data: "data" }, { status: 200 });
}
