import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {  doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Movie } from "../model/movies";
import {AiOutlineClose} from 'react-icons/ai'

export default function SavedMovies() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState<Movie[]>([]);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);
  
  const movieRef = doc(db, 'users', `${user?.email}`);
  const deleteFilm = async (passedID: string) => {

    try {
      const result = movies.filter((item) => item.id !== passedID)
      await updateDoc(movieRef, {
        savedShows: result,
      })
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">Movies</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="whitespace-nowrap  overflow-scroll no-scrollbar relative scroll-smooth"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {movie?.title}
                </p>
                <p onClick={() => deleteFilm(movie.id)} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose /></p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-60 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
}
