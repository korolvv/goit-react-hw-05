import { getMoviesByQuery } from "../../movies-api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function SearchPage() {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const query = searchParams.get("query") ?? "";

	useEffect(() => {
		if (query === "") {
			return;
		}
		async function fetchMovies() {
			try {
				setError(false);
				const data = await getMoviesByQuery(query);
				setData(data.results);
			} catch {
				console.log("Error");
				setError(true);
			}
		}
		fetchMovies();
	}, [query]);

	const handleSubmit = (values, actions) => {
		if (values.request !== "") {
			searchParams.set("query", values.request);
			setSearchParams(searchParams);
			actions.resetForm();
		}
	};

	return (
		<>
			{error ? (
				<NotFoundPage />
			) : (
				<>
					<Formik initialValues={{ request: "" }} onSubmit={handleSubmit}>
						<Form className={css.form}>
							<Field type="text" className={css.input} name="request"></Field>
							<ErrorMessage
								className={css.error}
								name="name"
								component="span"
							/>

							<button type="submit" className={css.btn}>
								Submit
							</button>
						</Form>
					</Formik>
					{data.length > 0 && <MoviesList movies={data} />}
				</>
			)}
		</>
	);
}
