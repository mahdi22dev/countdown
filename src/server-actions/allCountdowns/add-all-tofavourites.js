"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function addalltoFavorites(userCountdownId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("User not found");
    }

    const existingFavorites = await prisma.Favorites.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    if (!existingFavorites) {
      const newFavorites = await prisma.Favorites.create({
        data: {
          userId: session?.user?.id,
          countdowns: { connect: { id: userCountdownId } },
        },
      });
      return newFavorites;
    }

    const isCountdownInFavorites =
      existingFavorites.UserCountdowns &&
      existingFavorites.UserCountdowns.some(
        (countdown) => countdown === userCountdownId
      );

    if (isCountdownInFavorites) {
      const updatedFavorites = await prisma.Favorites.update({
        where: { id: existingFavorites.id },
        data: {
          countdowns: {
            disconnect: { id: userCountdownId },
          },
        },
      });

      return updatedFavorites;
    } else {
      const updatedFavorites = await prisma.Favorites.update({
        where: { id: existingFavorites.id },
        data: {
          countdowns: {
            connect: { id: userCountdownId },
          },
        },
      });

      return updatedFavorites;
    }
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
