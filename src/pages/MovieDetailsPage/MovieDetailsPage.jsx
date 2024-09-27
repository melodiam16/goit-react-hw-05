import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movieId);

  useEffect(() => {
    const fetchDataId = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjZDI0NjgxNmU0ZjcxZDEzYzQ4NjhiZGE4ZmNhYyIsIm5iZiI6MTcyNzQ0NTkwMS44OTE5MjksInN1YiI6IjY2ZTZlYTQyZGQyMjRkMWEzOTkxNWRjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u27hcUEBtUHvMsqi1g8R3XOGSvU6NaAxXsrUGX3zm0",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDataId();
  }, [movieId]);

  console.log(movie);

  return (
    <>
      {movie ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width="200"
          />
          <h1>{movie.title}</h1>
          <p>Overview</p>
          <p>{movie.overview}</p>
          <p>Genres</p>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
