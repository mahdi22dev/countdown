"use server";
import { prisma } from "@/lib/prismaClient";
export const getAllWithType = async (type, size, skip, date) => {
  let filter = [];

  if (date) {
    filter = {
      type: type,
      targetDate: {
        gte: date,
      },
    };
  } else {
    filter = {
      type: type,
    };
  }

  try {
    const countdown = await prisma.AllCountdowns.findMany({
      where: filter,
      take: size,
      skip: skip,
    });

    return countdown;
  } catch (error) {
    console.error("Error while fetching upcoming events countdowns:", error);
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};
