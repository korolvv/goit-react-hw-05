import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import css from "./ReviewsInfo.module.css";
import { getMovieReviews } from "../../movies-api";

export default function ReviewsInfo() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	const { moviesId } = useParams();

	useEffect(() => {
		async function fetchMovies() {
			try {
				// setIsError(false);
				setLoading(true);
				const data = await getMovieReviews(moviesId);
				setReviews(data.results);
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
			{reviews.length === 0 ? (
				<h3 className={css.title}>We don't have any reviews for this movie.</h3>
			) : (
				<ul className={css.list}>
					{reviews.map((review) => {
						return (
							<li className={css.item} key={review.id}>
								<h3>Star: {review.author}</h3>
								<p>Character: {review.content}</p>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
}
