"use server";
import { prisma } from "@/lib/prismaClient";
export const getAllCountdowns = async () => {
  try {
    const allCountdowns = await prisma.UserCountdown.findMany();
    return allCountdowns;
  } catch (error) {
    console.error("Error retrieving countdowns:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
