"use server";
import { prisma } from "@/lib/prismaClient";
export const getCountdown = async (userId, countdownId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        countdowns: {
          where: { id: countdownId },
        },
      },
    });
    return user;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
