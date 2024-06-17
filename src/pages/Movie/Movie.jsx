import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";
import { useParams } from "react-router-dom";
import { Vortex } from "react-loader-spinner";

import css from "./Movie.module.css";

export default function Movie() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	const { moviesId } = useParams();

	const url = `https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`;

	useEffect(() => {
		async function fetchMovies() {
			try {
				// setIsError(false);
				setLoading(true);
				const data = await getMovies(url);
				setMovies(data);
				console.log(data);
			} catch {
				console.log("Error");
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);

	const releaseDate = movies.release_date.substr(0, 4);

	return (
		<>
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
			<div className={css.wrapper}>
				<img
					src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
					alt={`${movies.original_title} poster.`}
				/>
				<div className={css.wrapperInfo}>
					<h2 className={css.title}>{movies.original_title} (releaseDate)</h2>
				</div>
			</div>
		</>
	);
}
