import { useEffect, useState } from "react";
import { getTrends } from "../../movies-api";
import MoviesList from "../../components/MoviesList/MoviesList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchMovies() {
			try {
				setError(false);
				const data = await getTrends();
				setMovies(data.results);
			} catch (error) {
				setError(true);
				console.log("Error:", error);
			}
		}
		fetchMovies();
	}, []);

	return <>{error ? <NotFoundPage /> : <MoviesList movies={movies} />}</>;
}
