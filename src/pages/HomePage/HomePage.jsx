import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjZDI0NjgxNmU0ZjcxZDEzYzQ4NjhiZGE4ZmNhYyIsIm5iZiI6MTcyNzQ0NTkwMS44OTE5MjksInN1YiI6IjY2ZTZlYTQyZGQyMjRkMWEzOTkxNWRjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u27hcUEBtUHvMsqi1g8R3XOGSvU6NaAxXsrUGX3zm0",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={css.listFilms}>
      <h1 className={css.title}>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
