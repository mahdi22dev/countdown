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
        userId: userId,
      },
      include: {
        countdowns: true, // Include the countdowns associated with favorites
      },
    });

    return userFavorites;
  } catch (error) {
    return error;
  }
}
