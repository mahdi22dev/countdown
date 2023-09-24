"use server";
import { prisma } from "@/lib/prismaClient";
export const getSllSingleCountdown = async (slug) => {
  try {
    const countdown = await prisma.AllCountdowns.findUnique({
      where: { slug: slug },
    });
    console.log(countdown);
    return countdown;
  } catch (error) {
    console.error("Error while fetching countdown:", error);
    throw new Error("Countdown not found");
  } finally {
    await prisma.$disconnect();
  }
};
