import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = params.get("query") || "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const queryValue = event.target.elements.query.value.trim();
    if (queryValue) {
      params.set("query", queryValue);
      setParams(params);
      event.target.reset();
    }
  };

  useEffect(() => {
    if (query === "") return;

    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYThhMWI2ZDA4MzZmYWJhNTc3YjdiNzkwZDI3NzgyZCIsIm5iZiI6MTcyNjE2Mjk3NC4zNzM4OTIsInN1YiI6IjY2ZTMyNjkwMjgwNDhkOTJkZWY5MTQzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5oNYe0IhjKjxs5uBTXuhgWhxS_1Fq-QvM-cFBdmQSmc",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Enter movie name"
        />

        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {!isLoading && query && movies.length === 0 && <p>Movie not found</p>}
      {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
