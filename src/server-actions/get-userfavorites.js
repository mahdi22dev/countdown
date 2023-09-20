import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function getUserFavorites() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }
    const userFavorites = await prisma.Favorites.findFirst({
      where: {
        userId: session?.user?.id,
      },
      include: {
        countdowns: true, // Include the countdowns associated with favorites
      },
    });

    const favoritesCount = userFavorites.countdowns.length; // Get the count

    return { favorites: userFavorites.countdowns, count: favoritesCount };
  } catch (error) {
    return error;
  }
}
