import { prisma } from "@/lib/prismaClient";
export const getAllWithType = async (type, size) => {
  try {
    const countdown = await prisma.AllCountdowns.findMany({
      where: { type: type },
      take: size,
    });

    if (!countdown.length) {
      throw new Error("0 countdowns returned");
    }
    return countdown;
  } catch (error) {
    console.error("Error while fetching upcoming events countdowns:", error);
    throw new Error("Countdown not found");
  } finally {
    await prisma.$disconnect();
  }
};