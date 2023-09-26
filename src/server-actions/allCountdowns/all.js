"use server";
import { prisma } from "@/lib/prismaClient";
const totalPages = 10;
const Data = [];

export const getAllCountdowns = async () => {
  try {
    const allCountdownsArray = [];

    await prisma.AllCountdowns.deleteMany({
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
        slug: encodedTitle,
      };
      allCountdownsArray.push(MovieObject);
    };

    movies.map(mapMoviegObject);

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

// trending functions
const fetchTrendings = async (page, type) => {
  const url = `https://api.themoviedb.org/3/trending/${type}/day?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
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

const getTrendings = async (type) => {
  for (let page = 1; page <= totalPages; page++) {
    const results = await fetchTrendings(page, type);
    console.log("fetch page: " + page + " type: " + type);
    if (results) {
      Data.push(...results);
    }
  }

  const currentDate = new Date();
  const trendings = Data.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate > currentDate;
  });

  return trendings;
};
