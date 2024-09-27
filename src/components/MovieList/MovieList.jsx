import { Link } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <>
      <ul>
        <li></li>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
