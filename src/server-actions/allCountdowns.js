"use server";
import { prisma } from "@/lib/prismaClient";
import { fetchTrendings } from "@/lib/utils";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
const totalPages = 100;
const Data = [];

export const getAllCountdowns = async () => {
  try {
    const allCountdownsArray = [];

    // make backup and delete
    const allCountdowns = await prisma.allCountdowns.findMany();
    console.log(allCountdowns);
    const backupAllCountdownsArray = [];
    const mapbackupcountdown = (trending) => {
      const {
        trendingId,
        title,
        popularity,
        imageUrl,
        description,
        targetDate,
        type,
        slug,
      } = trending;

      const BackupObject = {
        trendingId,
        title,
        popularity,
        imageUrl,
        description,
        targetDate,
        type,
        slug,
      };
      backupAllCountdownsArray.push(BackupObject);
    };
    allCountdowns.map(mapbackupcountdown);
    if (backupAllCountdownsArray == 0) {
    } else {
      await prisma.backupCountdowns.createMany({
        data: backupAllCountdownsArray,
      });
    }

    await prisma.allCountdowns.deleteMany({
      where: {},
    });

    const movies = await getTrendings("movie");

    const mapMoviegObject = (trending) => {
      const {
        id,
        original_title,
        overview,
        poster_path,
        popularity,
        release_date,
        media_type,
      } = trending;

      const encodedTitle = encodeURIComponent(original_title);

      const MovieObject = {
        trendingId: id,
        title: original_title,
        targetDate: `${release_date}T12:00:00Z`,
        imageUrl: `https://image.tmdb.org/t/p/w3840_and_h2160_bestv2${poster_path}`,
        description: overview,
        popularity: popularity,
        type: media_type,
        slug: encodedTitle.substring(0, 50),
      };
      allCountdownsArray.push(MovieObject);
    };

    movies.map(mapMoviegObject);

    // Insert filtered data into the database
    await prisma.allCountdowns.createMany({
      data: allCountdownsArray,
    });

    const AllCountdowns = await prisma.allCountdowns.findMany();
    return AllCountdowns;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const getTrendings = async (type) => {
  for (let page = 1; page <= totalPages; page++) {
    const results = await fetchTrendings(page, type);
    console.log("fetch page: " + page + " type: " + type);
    if (results) {
      Data.push(...results);
    }
  }

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const trendings = Data.filter((movie) => {
    const releaseDate = new Date(movie.release_date);

    // Check if the release date is in the future (not released yet)
    if (releaseDate > currentDate) {
      return true;
    }

    // Check if the release date is in the past but within the last 7 days
    if (releaseDate >= sevenDaysAgo) {
      return true;
    }

    return false;
  });
  return trendings;
};

export const getSllSingleCountdown = async (slug) => {
  try {
    const countdown = await prisma.allCountdowns.findUnique({
      where: { slug: slug },
    });
    return countdown;
  } catch (error) {
    console.error("Error while fetching countdown:", error);
    throw new Error("Countdown not found");
  } finally {
    await prisma.$disconnect();
  }
};

export async function addalltoFavorites(slug) {
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
          AllCountdowns: { connect: { slug: slug } },
        },
      });
      return newFavorites;
    }

    const isCountdownInFavorites =
      existingFavorites.AllCountdowns &&
      existingFavorites.AllCountdowns.some((countdown) => countdown === slug);

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
export const getAllWithType = async (type, size, skip, date) => {
  let filter = [];

  if (date) {
    filter = {
      type: type,
      targetDate: {
        gte: date,
      },
    };
  } else {
    filter = {
      type: type,
    };
  }

  try {
    let countdown;
    countdown = await prisma.AllCountdowns.findMany({
      where: filter,
      take: size,
      skip: skip,
    });
    if (countdown.length == 0) {
      countdown = await prisma.BackupCountdowns.findMany({
        where: filter,
        take: size,
        skip: skip,
      });
    }
    return countdown;
  } catch (error) {
    console.error("Error while fetching upcoming events countdowns:", error);
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
};
