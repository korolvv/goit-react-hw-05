import { Suspense, useEffect, useState } from "react";
import { getMovieDetails } from "../../movies-api";
import {
	Link,
	NavLink,
	Outlet,
	useLocation,
	useParams,
} from "react-router-dom";

import css from "./MoviesDetailsPage.module.css";
import { useRef } from "react";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function Movie() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(false);

	const location = useLocation();
	const backHref = useRef(location.state ?? "/movies");

	const { moviesId } = useParams();

	let dateRelease = useRef("");

	let userScore = useRef("");

	let genres = useRef("");

	useEffect(() => {
		async function fetchMovies() {
			try {
				setError(false);
				const data = await getMovieDetails(moviesId);
				setMovies(data);

				dateRelease.current = `(${data.release_date.substring(0, 4)})`;
				userScore.current = `User score: ${data.vote_average * 10}%`;
				genres.current = getGenres(data);
				console.log(movies.poster_path);
			} catch {
				console.log("Error");
				setError(true);
			}
		}

		fetchMovies();
	}, [moviesId]);

	const getGenres = (data) => {
		let arr = [];
		data.genres.map((item) => {
			arr.push(item.name);
		});
		return arr.join(", ");
	};

	return (
		<>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<Link to={backHref.current} className={css.btn}>
						Go back
					</Link>

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
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</>
			)}
		</>
	);
}
