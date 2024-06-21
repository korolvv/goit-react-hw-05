import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() =>
	import("../../pages/NotFoundPage/NotFoundPage")
);
const Navigation = lazy(() => import("../Navigation/Navigation"));
const MoviesDetailsPage = lazy(() =>
	import("../../pages/MoviesDetailsPage/MoviesDetailsPage")
);
// components
const CastInfo = lazy(() => import("../CastInfo/CastInfo"));
const ReviewsInfo = lazy(() => import("../ReviewsInfo/ReviewsInfo"));

function App() {
	return (
		<>
			<Navigation />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/:moviesId" element={<MoviesDetailsPage />}>
						<Route path="cast" element={<CastInfo />}></Route>
						<Route path="reviews" element={<ReviewsInfo />}></Route>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
