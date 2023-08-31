import axios from "axios";
import { useState, useEffect } from "react";
import requests from "../Requests";
import { Movie } from "../model/movies";


export const MainInfo = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const movie: Movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = (str: string, num: number) => {
    if(str?.length > num) {
        return str.slice(0,num) + '...';
    } else {
        return str;
    }

  }

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-t from-black"></div>
        <img
          className="w-full h-full object-cover object-top"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title ?? "no title"}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border  text-white border-gray-300 py-2 px-5 m-1">
              Watch Here
            </button>
          </div>
          <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
          <p className="w-full text-gray-200 md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{truncateString(movie?.overview, 150)}</p>
        </div>
      </div>
    </div>
  );
};
