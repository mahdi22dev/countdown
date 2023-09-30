"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export const deleteCountdown = async (countdownId) => {
  try {
    const deletedCountdown = await prisma.UserCountdown.delete({
      where: { id: countdownId },
    });
    if (!deletedCountdown) {
      throw new Error("Countdown not found");
    }
    return deletedCountdown;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
