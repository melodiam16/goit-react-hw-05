import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const responce = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjZDI0NjgxNmU0ZjcxZDEzYzQ4NjhiZGE4ZmNhYyIsIm5iZiI6MTcyNzQ0NTkwMS44OTE5MjksInN1YiI6IjY2ZTZlYTQyZGQyMjRkMWEzOTkxNWRjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u27hcUEBtUHvMsqi1g8R3XOGSvU6NaAxXsrUGX3zm0",
            },
          }
        );
        setCast(responce.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <ul className={css.cast}>
          {cast.map((actor) => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast available</p>
      )}
    </>
  );
}
