"use server";
import { prisma } from "@/lib/prismaClient";
export const getSllSingleCountdown = async (countdownId) => {
  try {
    // fetch trending

    const countdown = await prisma.AllCountdowns.findUnique({
      where: { id: countdownId },
    });

    return countdown;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
