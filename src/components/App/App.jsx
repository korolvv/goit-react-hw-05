import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Navigation from "../Navigation/Navigation";
import Movie from "../../pages/Movie/Movie";
import CastInfo from "../CastInfo/CastInfo";
import ReviewsInfo from "../ReviewsInfo/ReviewsInfo";

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:moviesId" element={<Movie />}>
					<Route path="cast" element={<CastInfo />}></Route>
					<Route path="reviews" element={<ReviewsInfo />}></Route>
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
