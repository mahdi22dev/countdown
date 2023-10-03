"use server";
import { prisma } from "@/lib/prismaClient";
import { formatISO } from "date-fns";
export const getAllWithType = async (type, size, skip, date) => {
  try {
    const countdown = await prisma.AllCountdowns.findMany({
      where: {
        type: type,
        targetDate: {
          gte: date || "", // Filter where targetDate is greater than or equal to the current date
        },
      },
      take: size,
      skip: skip,
    });

    return countdown;
  } catch (error) {
    console.error("Error while fetching upcoming events countdowns:", error);
    throw new Error("Countdown not found");
  } finally {
    await prisma.$disconnect();
  }
};
