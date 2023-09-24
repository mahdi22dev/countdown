"use server";
import { prisma } from "@/lib/prismaClient";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGU4NmFlNWYzMmEzYjVjYzdlOGZlYjQwZGUwNDJhMSIsInN1YiI6IjY0YTEyNTcxNGE1MmY4MDBhZjEyN2I2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TbYwtxSpkX8VkKoghnxMD7rlXZiSFV6oFwd5iYwvBIY";
// Replace with your API key
const totalPages = 1000; // Total number of pages to fetch
const moviesData = [];

export const getAllCountdowns = async () => {
  try {
    const allCountdownsArray = [];

    await prisma.AllCountdowns.deleteMany({
      where: {},
    });

    //first
    const result = await getTrendingMovies();
    // second games anime ...

    result.map((trending) => {
      const {
        id,
        original_title,
        overview,
        poster_path,
        popularity,
        release_date,
        media_type,
      } = trending;

      const trendingObject = {
        trendingId: id,
        title: original_title,
        targetDate: `${release_date}T12:00:00Z`,
        imageUrl: poster_path,
        description: overview,
        popularity: popularity,
        type: media_type,
      };

      allCountdownsArray.push(trendingObject);
    });

    const dataCreated = await prisma.AllCountdowns.createMany({
      data: allCountdownsArray,
    });

    console.log(dataCreated);

    const AllCountdowns = await prisma.AllCountdowns.findMany();
    return AllCountdowns;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// trending functions

const fetchTrendingMovies = async (page) => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getTrendingMovies = async () => {
  for (let page = 1; page <= totalPages; page++) {
    const movies = await fetchTrendingMovies(page);
    console.log("fetching page N: " + page);
    if (movies) {
      moviesData.push(...movies);
    }
  }
  const currentDate = new Date();
  const unreleasedMovies = moviesData.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate > currentDate;
  });

  return unreleasedMovies;
};
