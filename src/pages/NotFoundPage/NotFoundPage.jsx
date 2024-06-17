import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
	return (
		<h1 className={css.h1}>
			Sorry, the page not found! Please return to{" "}
			<Link className={css.link} to="/">
				home page
			</Link>
			.
		</h1>
	);
}
