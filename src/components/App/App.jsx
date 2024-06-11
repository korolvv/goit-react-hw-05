import { useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { getMovies } from "../../movies-api";

import css from "./App.module.css";

const [movies, setMovies] = useState([]);

useEffect(() => {
	async function fetchMovies() {
		try {
			// setIsError(false);
			// setIsLoading(true);
			const data = await getMovies();
			setMovies(data);
		} catch {
			console.log("error");
		} finally {
			console.log("good");
		}
	}

	fetchMovies();
}, []);

function App() {
	return (
		<>
			<nav className={css.nav}>
				<NavLink className={css.link} to="/">
					Home
				</NavLink>
				<NavLink className={css.link} to="/movies">
					Movies
				</NavLink>
			</nav>

			<Routes>
				<Route path="/" element={HomePage} />
				<Route path="/movies" element={MoviesPage} />
				<Route path="*" element={NotFoundPage} />
			</Routes>
		</>
	);
}

export default App;
