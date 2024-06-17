import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";

const getLinkClass = ({ isActive }) => {
	return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
	return (
		<nav className={css.nav}>
			<ul className={css.list}>
				<li>
					<NavLink className={getLinkClass} to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink className={getLinkClass} to="/movies">
						Movies
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
