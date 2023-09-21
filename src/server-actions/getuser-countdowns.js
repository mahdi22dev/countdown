"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function getAllUserCountdowns(skip, size, filterOption) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }
    if (filterOption == "all") {
      const userWithCountdowns = await prisma.UserCountdown.findMany({
        where: {
          userId: userId,
        },
        take: size,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
      });
      return userWithCountdowns;
    }

    if (filterOption == "soon") {
      const soonEndingThreshold = new Date();
      soonEndingThreshold.setDate(soonEndingThreshold.getDate() + 7);
      const userWithCountdowns = await prisma.UserCountdown.findMany({
        where: {
          userId: userId,
          targetDate: {
            lte: soonEndingThreshold,
          },
        },
        take: size,
        skip: skip,
      });
      return userWithCountdowns;
    }
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCountOfUserCountdowns() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    const userId = session.user.id;
    const count = await prisma.userCountdown.count({
      where: { userId: userId },
    });
    return count;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
