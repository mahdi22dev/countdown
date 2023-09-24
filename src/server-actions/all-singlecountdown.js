"use server";
import { prisma } from "@/lib/prismaClient";
export const getSllSingleCountdown = async (countdownId) => {
  try {
    const countdown = await prisma.UserCountdown.findUnique({
      where: { id: countdownId },
    });

    return countdown;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
