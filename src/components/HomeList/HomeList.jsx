import { Link } from "react-router-dom";
import css from "./HomeList.module.css";

export default function HomeList({ movies }) {
	return (
		<ul className={css.list}>
			{movies.map((movie) => {
				return (
					<li className={css.item} key={movie.id}>
						<Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
					</li>
				);
			})}
		</ul>
	);
}
