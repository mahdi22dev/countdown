"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function addtoFavouritesk(userCountdownId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("User not found");
    }
    let existingFavourites;
    let newFavourites;

    existingFavourites = await prisma.Favourites.findFirst({
      where: {
        userId: session?.user?.id,
      },
    });

    if (!existingFavourites) {
      // If the user doesn't have an existing bookmark, create a new one
      newFavourites = await prisma.Favourites.create({
        data: {
          userId: session?.user?.id,
          countdowns: { connect: { id: userCountdownId } },
        },
      });
      return newFavourites;
    }

    // Check if the countdown is already in the user's favorites

    const isCountdownInFavorites =
      existingFavourites.UserCountdowns && // Check if favorites.countdowns is defined
      existingFavourites.UserCountdowns.some(
        (countdown) => countdown === userCountdownId
      );
    console.log(isCountdownInFavorites);
    if (isCountdownInFavorites) {
      const updatedFavorites = await prisma.Favourites.update({
        where: { id: existingFavourites.id },
        data: {
          countdowns: {
            disconnect: { id: userCountdownId },
          },
        },
      });

      return updatedFavorites;
    } else {
      const updatedFavorites = await prisma.Favourites.update({
        where: { id: existingFavourites.id },
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
