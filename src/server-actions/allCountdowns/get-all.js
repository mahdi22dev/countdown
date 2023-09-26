"use server";
import { prisma } from "@/lib/prismaClient";
export const getAllWithType = async (type, size, skip) => {
  try {
    const countdown = await prisma.AllCountdowns.findMany({
      where: { type: type },
      take: size,
      skip: skip,
    });
    console.log(countdown);

    return countdown;
  } catch (error) {
    console.error("Error while fetching upcoming events countdowns:", error);
    throw new Error("Countdown not found");
  } finally {
    await prisma.$disconnect();
  }
};
