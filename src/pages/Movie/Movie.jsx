import { useEffect, useState } from "react";
import { getMovies } from "../../movies-api";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Vortex } from "react-loader-spinner";

import css from "./Movie.module.css";
import { useRef } from "react";

export default function Movie() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	const { moviesId } = useParams();

	let dateRelease = useRef("");

	let userScore = useRef("");

	let genres = useRef("");

	const url = `https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`;

	useEffect(() => {
		async function fetchMovies() {
			try {
				// setIsError(false);
				setLoading(true);
				const data = await getMovies(url);
				setMovies(data);

				dateRelease.current = `(${data.release_date.substring(0, 4)})`;
				userScore.current = `User score: ${data.vote_average * 10}%`;
				genres.current = getGenres(data);
			} catch {
				console.log("Error");
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, []);

	const getGenres = (data) => {
		let arr = [];
		data.genres.map((item) => {
			arr.push(item.name);
		});
		return arr.join(", ");
	};

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
					className={css.poster}
					src={`https://image.tmdb.org/t/p/w300${movies.poster_path}`}
					alt={`${movies.original_title} poster.`}
				/>
				<div className={css.wrapperInfo}>
					<h2 className={css.title}>
						{movies.original_title} {dateRelease.current}
					</h2>
					<p>{userScore.current}</p>
					<h3>
						<b>Overview</b>
					</h3>
					<p>{movies.overview}</p>
					<h3>
						<b>Genres</b>
					</h3>
					<p>{genres.current}</p>
				</div>
			</div>
			<div>
				<h2 className={css.title}>Additional information</h2>
				<ul className={css.list}>
					<li className={css.item}>
						<NavLink to="cast">Cast</NavLink>
					</li>
					<li className={css.item}>
						<NavLink to="reviews">Reviews</NavLink>
					</li>
				</ul>
			</div>
			<hr />
			<Outlet />
		</>
	);
}
