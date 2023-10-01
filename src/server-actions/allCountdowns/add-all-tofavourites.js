"use server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function addalltoFavorites(slug) {
  console.log(slug);
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
    console.log(existingFavorites);

    if (!existingFavorites) {
      const newFavorites = await prisma.Favorites.create({
        data: {
          userId: session?.user?.id,
          AllCountdowns: { connect: { slug: slug } },
        },
      });
      return newFavorites;
    }

    const isCountdownInFavorites =
      existingFavorites.AllCountdowns &&
      existingFavorites.AllCountdowns.some((countdown) => countdown === slug);
    console.log(isCountdownInFavorites);

    if (isCountdownInFavorites) {
      const updatedFavorites = await prisma.Favorites.update({
        where: { id: existingFavorites.id },
        data: {
          AllCountdowns: {
            disconnect: { slug: slug },
          },
        },
      });

      return updatedFavorites;
    } else {
      const updatedFavorites = await prisma.Favorites.update({
        where: { id: existingFavorites.id },
        data: {
          AllCountdowns: {
            connect: { slug: slug },
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
