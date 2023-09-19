"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function addtoFavorites(userCountdownId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("User not found");
    }
    let existingFavorites;
    let newFavorites;

    existingFavorites = await prisma.Favorites.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    if (!existingFavorites) {
      // If the user doesn't have an existing bookmark, create a new one
      newFavorites = await prisma.Favorites.create({
        data: {
          userId: session?.user?.id,
          countdowns: { connect: { id: userCountdownId } },
        },
      });
      return newFavorites;
    }

    // Check if the countdown is already in the user's favorites

    const isCountdownInFavorites =
      existingFavorites.UserCountdowns && // Check if favorites.countdowns is defined
      existingFavorites.UserCountdowns.some(
        (countdown) => countdown === userCountdownId
      );
    console.log(isCountdownInFavorites);
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
    throw new Error(`Failed to add bookmark: ${error.message}`);
  }
}
