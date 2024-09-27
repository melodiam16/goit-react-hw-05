import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieReviews from "./components/MovieReviews/MovieReviews";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
