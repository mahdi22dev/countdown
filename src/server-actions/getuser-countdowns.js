"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function getAllUserCountdowns(skip, size) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  const userWithCountdowns = await prisma.UserCountdown.findMany({
    where: { userId: userId },
    take: size,
    skip: skip,
  });
  return userWithCountdowns;
}

export async function getCountOfUserCountdowns() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const count = await prisma.userCountdown.count({
    where: { userId: userId },
  });
  return count;
}
