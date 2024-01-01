"use server";
import { messages } from "@/config/messages";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import { test } from "./test";

export async function onCreate(formData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: { login: messages.login } };
  }
  const existingUser = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  // await test(session?.user?.id);

  if (!existingUser) {
    return { message: { Notfound: messages.Notfound } };
  } else {
    try {
      const newCountdown = await prisma.userCountdown.create({
        data: {
          ...formData,
          userId: existingUser.id,
        },
      });

      return { message: { success: messages.success, newCountdown } };
    } catch (error) {
      return { message: { tryagain: messages.tryagain } };
    } finally {
      await prisma.$disconnect();
    }
  }
}

export async function addtoFavorites(userCountdownId) {
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
export async function searchCountdownsByTitle(value) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        countdowns: {
          where: {
            title: {
              contains: value,
              startsWith: value,
            },
          },
          take: 50,
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error searching countdowns:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export const deleteCountdown = async (countdownId) => {
  try {
    const deletedCountdown = await prisma.UserCountdown.delete({
      where: { id: countdownId },
    });
    if (!deletedCountdown) {
      throw new Error("Countdown not found");
    }
    return deletedCountdown;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export async function grabUserFavorites() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return null;
    }
    const userFavorites = await prisma.favorites.findFirst({
      where: {
        userId: session?.user?.id,
      },
      include: {
        countdowns: true,
      },
    });

    return userFavorites;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export const getCountdown = async (userId, countdownId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        countdowns: {
          where: { id: countdownId },
        },
      },
    });
    return user;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export async function getAllUserCountdowns(skip, size, filterOption) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }
    if (filterOption == "all") {
      const userWithCountdowns = await prisma.UserCountdown.findMany({
        where: {
          userId: userId,
        },
        take: size,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
      });
      return userWithCountdowns;
    }

    if (filterOption == "soon") {
      const soonEndingThreshold = new Date();
      soonEndingThreshold.setDate(soonEndingThreshold.getDate() + 7);
      const userWithCountdowns = await prisma.UserCountdown.findMany({
        where: {
          userId: userId,
          targetDate: {
            lte: soonEndingThreshold,
          },
        },
        take: size,
        skip: skip,
      });
      return userWithCountdowns;
    }
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCountOfUserCountdowns() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    const userId = session.user.id;
    const count = await prisma.userCountdown.count({
      where: { userId: userId },
    });
    return count;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}
