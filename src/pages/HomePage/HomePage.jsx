import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";
import HomeList from "../../components/HomeList/HomeList";
import { Vortex } from "react-loader-spinner";

import css from "./HomePage.module.css";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMovies() {
			try {
				setLoading(true);
				const data = await getMovies();
				setMovies(data.results);
			} catch {
				console.log("Error");
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);

	return (
		<>
			<h1 className={css.h1}>Trending today</h1>
			{loading && (
				<Vortex
					visible={true}
					height="80"
					width="80"
					ariaLabel="vortex-loading"
					wrapperStyle={{}}
					wrapperClass="vortex-wrapper"
					colors={["red", "green", "blue", "yellow", "orange", "purple"]}
				/>
			)}
			{movies.length > 0 && <HomeList movies={movies} />}
		</>
	);
}
