import { searchMovies } from "../../movies-api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function SearchPage() {
	// const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	const url = "https://api.themoviedb.org/3/search/movie";

	const query = searchParams.get("query") ?? "";

	useEffect(() => {
		handleSubmit();
	}, []);

	const handleSubmit = (values, actions) => {
		if (values) {
			searchParams.set("query", values.request);
			setSearchParams(searchParams);
			actions.resetForm();
		} else {
			searchParams.set("query", query);
		}
		// setSearchParams(searchParams);
		async function fetchMovies() {
			try {
				// setIsError(false);
				// setLoading(true);
				const data = await searchMovies(url, searchParams.get("query"));
				setData(data.results);
			} catch {
				console.log("Error");
			} finally {
				// setLoading(false);
			}
		}
		fetchMovies();
	};

	return (
		<>
			<Formik initialValues={{ request: "" }} onSubmit={handleSubmit}>
				<Form className={css.form}>
					<Field type="text" className={css.input} name="request"></Field>
					<ErrorMessage className={css.error} name="name" component="span" />

					<button type="submit" className={css.btn}>
						Submit
					</button>
				</Form>
			</Formik>
			{data.length > 0 && <MoviesList movies={data} />}
		</>
	);
}
