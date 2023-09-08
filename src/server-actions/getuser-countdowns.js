"use server";
import { prisma } from "@/lib/prismaClient";

export async function getAllUserCountdowns(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return null;
  }
  const userWithCountdowns = await prisma.UserCountdown.findMany({
    where: { userId: userId },
    take: 12,
    orderBy: { createdAt: "desc" },
  });
  return userWithCountdowns;
}
