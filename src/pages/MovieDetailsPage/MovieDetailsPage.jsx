import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const backLinkRef = useRef(location.state ?? "/movies");

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

  const getNavLinkClass = (props) => {
    return clsx(css.link, props.isActive && css.active);
  };

  return (
    <>
      {movie ? (
        <>
          <button
            className={css.btn}
            onClick={() => navigate(backLinkRef.current)}
          >
            🢀 Go back
          </button>
          <div className={css.boxContent}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width="200"
              />
            </div>
            <div className={css.rightBoxContent}>
              <h1 className={css.contentTitle}>{movie.title}</h1>
              <p className={css.txtBold}>Overview</p>
              <p>{movie.overview}</p>
              <p className={css.txtBold}>Genres</p>
              <ul className={css.genres}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <p className={css.title}>Additional information</p>
      <ul className={css.addInfo}>
        <li>
          <NavLink to="cast" className={getNavLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={getNavLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>LOADING SUBPAGE...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
