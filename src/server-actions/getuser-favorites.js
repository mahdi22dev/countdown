import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";

export async function grabUserFavorites() {
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
        countdowns: true,
      },
    });

    return userFavorites;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
