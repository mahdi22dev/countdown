import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log(formData);
    const userId = "64e9d74fd86bcdd666310046";
    const newCountdownData = {
      title: "Upcoming Event",
      targetDate: new Date("2023-12-31"),
    };

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ success: false }, { status: 200 });
    } else {
      const newCountdown = await prisma.userCountdown.create({
        data: {
          ...newCountdownData,
          userId: existingUser.id,
        },
      });

      console.log("Countdown added to the user:", newCountdown);
    }
    return NextResponse.json({ success: true, data: "data" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, data: "null" }, { status: 401 });
  }
}
