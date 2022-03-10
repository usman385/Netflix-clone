import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const base_url = "https://image.tmdb.org/t/p/original/";

const Rows = ({ title, fetchUrl, islargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchmovies = async () => {
      const res = await axios.get(fetchUrl);
      const response = res.data.results;
      // console.log("row data:", response);
      setMovies(response);
    };
    fetchmovies();
  }, [fetchUrl]);

  console.table("movies ", movies);

  return (
    <div className="bg-black mt-28 ml-8">
      <h1 className="text-2xl font-bold flex ml-14 text-slate-50">{title}</h1>

      <div className="flex overflow-y-hidden overflow-x-scroll customClass ">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className=" border-2 m-1 border-red-800 p-2">
              <img
                src={`${base_url}${
                  islargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                className=" object-contain h-auto w-32 hover:scale-y-[1.08] hover:duration-500 hover:grayscale"
              />
              <p className="text-lg font-semibold text-ellipsis text-white">
                {movie.name || movie.title || movie.original_title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rows;
