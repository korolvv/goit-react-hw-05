import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";

export default function HomeList({ movies }) {
	const location = useLocation();

	return (
		<>
			<h1 className={css.h1}>Trending today</h1>
			<ul className={css.list}>
				{movies.map((movie) => {
					return (
						<li className={css.item} key={movie.id}>
							<Link to={`/movies/${movie.id}`} state={location}>
								{movie.original_title}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}
