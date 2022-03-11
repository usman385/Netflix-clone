import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "../api/axios";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

const base_url = "https://image.tmdb.org/t/p/original/";

const Rows = ({ title, fetchUrl, islargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerurl, setTrailerUrl] = useState("");
  const [modalopen, setmodalopen] = useState(false);

  const handleclose = () => {
    setmodalopen(false);
  };

  useEffect(() => {
    const fetchmovies = async () => {
      const res = await axios.get(fetchUrl);
      const response = res.data.results;
      // console.log("row data:", response);
      setMovies(response);
    };
    fetchmovies();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerurl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setmodalopen(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    with: "100%",
    align: "center",
    playerVar: {
      autoplay: 1,
    },
  };
  console.log("modal", modalopen);
  // console.table("movies ", movies);
  console.log("video", trailerurl);

  return (
    <div className="bg-black ml-8">
      <h1 className="text-2xl font-bold flex ml-14 text-slate-50">{title}</h1>

      <div className="flex overflow-y-hidden overflow-x-scroll customClass ">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="  m-1  p-2">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={65}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <SwiperSlide className="w-full">
                  <div className="w-full">
                    <img
                      onClick={() => handleClick(movie)}
                      src={`${base_url}${
                        islargeRow ? movie.poster_path : movie.backdrop_path
                      }`}
                      alt={movie.name}
                      className={` object-contain h-auto w-48 hover:scale-y-[1.20] hover:scale-x-[1.20] 
                    hover:duration-500 hover:grayscale hover:${movie.title}`}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
              {/* <p className="text-lg font-semibold text-ellipsis text-white">
                {movie.name || movie.title || movie.original_title}
              </p> */}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-16 content-center items-center">
        <Modal
          isOpen={modalopen}
          className="flex justify-center  mt-60 w-[48%] lg:ml-[30rem] ml-48 bg-black relative"
        >
          {trailerurl && <YouTube videoId={trailerurl} opts={opts} />}
          <button
            onClick={handleclose}
            className="text-teal-100 absolute lg:right-3 right-0 left-[30rem] top-4 text-xl"
          >
            <AiOutlineClose />
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Rows;
