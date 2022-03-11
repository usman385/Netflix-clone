import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requst from "../api/endPoints";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";


const base_url = "https://image.tmdb.org/t/p/original/";

const Banner = ({ title }) => {
  const [movies, setSetMovies] = useState([]);
  const [trailerurl, setTrailerUrl] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [modalopen, setmodalopen] = useState(false);

  const handleclose = () => {
    setmodalopen(false);
  };

  const video = () => {
    playVideo(true);
  };

  const handleClick = (movie) => {
    if (trailerurl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setPlayVideo(true);
          setmodalopen(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "608",
    with: "100%",
    align: "center",
    playerVar: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(requst.fetchNetflixOriginals);
      const response = res.data.results;
      setSetMovies(
        response[Math.floor(Math.random() * res.data.results.length - 1)]
      );
      return response;
    };
    fetchdata();
  }, []);

  //   console.log("banner movies:", movies);

  return (
    <>
      {playVideo === false ? (
        <header
          className="bg-center object-contain h-[38rem] relative bg-no-repeat
            text-white"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
          }}
        >
        

          <div className="absolute top-60 lg:left-32 md:left-32 left-6 flex flex-col">
            <h1 className="flex lg:text-7xl md:text-7xl text-4xl text-slate-100 font-extrabold">
              {movies?.name || movies?.title || movies?.original_title}
            </h1>



            <div className="flex mt-6 mb-6 lg:justify-start md:justify-start justify-center">
              <button
                className="lg:text-xl md:xl text-sm cursor-pointer rounded-lg lg:pl-16
           md:pl-16 pl-8 lg:pr-16 md:pr-16 pr-5 mr-2 bg-stone-700 
          text-white font-medium pb-2 pt-2 opacity-25 hover:bg-white
           hover:text-black hover:opacity-100"
                onClick={() => handleClick(movies)}
              >
                Play
              </button>
              

              <button
                className="lg:text-xl md:xl text-sm cursor-pointer 
          rounded-lg lg:pl-16 md:pl-16 pl-8 lg:pr-16 md:pr-16 pr-5 mr-2 bg-stone-700 
          text-white font-medium pb-2 pt-2 opacity-25 hover:bg-white hover:text-black hover:opacity-100"
              >
                My List
              </button>

             
            </div>
           
            <p className="text-sm leading-snug text-slate-100 font-medium text-center lg:w-1/2 md:w-1/2 w-full">
              {movies.overview}
            </p>
          </div>
          <div className="h-[38rem] footerClass"></div>
        </header>
      ) : playVideo === true && trailerurl ? (
        <div>
          <Modal
            isOpen={modalopen}
            className="flex justify-center mt-24 w-[48%] lg:ml-[30rem] ml-48 bg-black relative"
          >
            <YouTube
              videoId={trailerurl}
              opts={opts}
              className="w-[38rem] h-[32rem]"
            />
            <button
              onClick={handleclose}
              className="text-teal-100 absolute lg:right-60 right-20 left-[30rem] top-4 text-xl"
            >
              <AiOutlineClose />
            </button>
          </Modal>
        </div>
      ) : null}
    </>
  );
};

export default Banner;
