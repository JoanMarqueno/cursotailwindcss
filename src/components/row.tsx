import { useState, useEffect } from "react";

import axios from "axios";
import { Movie } from "../model/movies";
import MovieComponent from "../components//movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
type Props = {
  title: string;
  fetchURL: string;
  rowId: string;
};

export default function RowRequests({ title, fetchURL, rowId }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };
  
  const slideRight = () => {
    let slider = document.getElementById('slider' + rowId);
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
        onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-60 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowId}
          className="whitespace-nowrap  overflow-scroll no-scrollbar relative scroll-smooth"
        >
          {movies.map((movie, id) => (
            <MovieComponent key={id} item={movie} />
          ))}
        </div>
        <MdChevronRight
        onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-60 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
}
