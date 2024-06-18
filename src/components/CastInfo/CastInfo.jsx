import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import css from "./CastInfo.module.css";
import { getMovies } from "../../movies-api";

export default function CastInfo() {
	const [cast, setCast] = useState([]);
	const [loading, setLoading] = useState(false);

	const { moviesId } = useParams();

	const url = `https://api.themoviedb.org/3/movie/${moviesId}/credits`;

	useEffect(() => {
		async function fetchMovies() {
			try {
				// setIsError(false);
				setLoading(true);
				const data = await getMovies(url);
				setCast(data.cast);
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
			<ul className={css.list}>
				{cast.map((star) => {
					if (star.profile_path === null) {
						return;
					}
					return (
						<li className={css.item} key={star.id}>
							<img
								src={`https://image.tmdb.org/t/p/w200${star.profile_path}`}
								alt={star.name}
							/>
							<p>Star: {star.name}</p>
							<p>Character: {star.character}</p>
						</li>
					);
				})}
			</ul>
		</>
	);
}
