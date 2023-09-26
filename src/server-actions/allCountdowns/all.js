"use server";
import { prisma } from "@/lib/prismaClient";
import { fetchTrendings } from "@/lib/utils";
const totalPages = 1000;
const Data = [];

export const getAllCountdowns = async () => {
  try {
    const allCountdownsArray = [];

    await prisma.AllCountdowns.deleteMany({
      where: {},
    });

    const movies = await getTrendings("movie");
    const tvs = await getTrendings("tv");

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
        slug: encodedTitle,
      };
      allCountdownsArray.push(MovieObject);
    };

    movies.map(mapMoviegObject);
    tvs.map(mapMoviegObject);

    // Insert filtered data into the database
    const createdCountdowns = await prisma.AllCountdowns.createMany({
      data: allCountdownsArray,
    });
    console.log(createdCountdowns);

    const AllCountdowns = await prisma.AllCountdowns.findMany();
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
  console.log(trendings);
  return trendings;
};
