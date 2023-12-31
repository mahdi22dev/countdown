"use client";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { notifyError } from "@/lib/Toast";
import { addalltoFavorites } from "@/server-actions/allCountdowns";

const AlladdFavorite = ({ countdown }) => {
  const redirectToCountdown = (event) => {
    event.stopPropagation();
  };

  const [isFavorite, setFavorite] = useState(
    countdown.Favourite.length ? true : false
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (countdown.Favourite.length) {
      setFavorite(true);
    }
  }, []);

  const addToFavourutes = async () => {
    try {
      setFavorite(!isFavorite);
      const res = await addalltoFavorites(countdown.slug);
      return res;
    } catch (error) {
      setFavorite(false);
      setIsError(true);
    }
  };
  if (isError) {
    notifyError("an error occurred when adding your favorite");
  }

  return (
    <div
      onClick={(event) => redirectToCountdown(event)}
      className="tooltip cursor-pointer"
      data-tip={`${
        isFavorite ? "remove from to Favorites" : "add to Favorites"
      }`}
    >
      <FaHeart
        className={`${
          isFavorite && "text-primary"
        } mx-1 text-xl hover:text-primary duration-75`}
        onClick={() => {
          addToFavourutes();
        }}
      />
    </div>
  );
};

export default AlladdFavorite;
