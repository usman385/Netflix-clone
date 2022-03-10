import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const base_url = "https://image.tmdb.org/t/p/original/";

const Rows = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchmovies = async () => {
      const res = await axios.get(fetchUrl);
      const response = res.data.results;
      setMovies(response);
    };
    fetchmovies();
  }, [fetchUrl]);

  console.table("movies ", movies);

  return (
    <div>
      <h1 className="text-2xl font-bold flex ml-14">{title}</h1>

      <div className="flex overflow-y-hidden overflow-x-scroll ">
        {movies.map((movie) => {
          return (
            <div className=" p-5">
              <img
                key={movie.id}
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
                className=" object-cover h-auto max-w-[8rem] hover:scale-y-[1.08] hover:duration-500 mb-4 "
              />
              <p className="text-lg font-semibold text-ellipsis">
                {movie.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rows;
