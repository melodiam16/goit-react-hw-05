import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const responce = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVjZDI0NjgxNmU0ZjcxZDEzYzQ4NjhiZGE4ZmNhYyIsIm5iZiI6MTcyNzQ0NTkwMS44OTE5MjksInN1YiI6IjY2ZTZlYTQyZGQyMjRkMWEzOTkxNWRjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u27hcUEBtUHvMsqi1g8R3XOGSvU6NaAxXsrUGX3zm0",
            },
          }
        );
        setReviews(responce.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  console.log(reviews);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.rewievs}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We dont have any reviews for this movies</p>
      )}
    </>
  );
}
