// import axios from "axios";

// const API_KEY =
// 	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM2MjEwMGU2NjU5ZTc5MGVmYmZhNTUyNjQwNDUyZSIsInN1YiI6IjY2NjQ1NGJiZTQ2MjY3OGY3ZTEzNjRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMCfxHw564MWApeNmBXlYiBHpR1Bwb0y3xuQdIcFyM8";

// axios.defaults.baseURL =
// 	"https://api.themoviedb.org/3/trending/movie/day?language=en-US";

// export const getMovies = async () => {
// 	const response = await axios.get("/3/trending/movie/day?language=en-US", {
// 		params: {
// 			client_id: API_KEY,
// 			// query: topic,
// 		},
// 	});

// 	return response.data.results;
// };

export const getMovies = () => {
	const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM2MjEwMGU2NjU5ZTc5MGVmYmZhNTUyNjQwNDUyZSIsInN1YiI6IjY2NjQ1NGJiZTQ2MjY3OGY3ZTEzNjRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMCfxHw564MWApeNmBXlYiBHpR1Bwb0y3xuQdIcFyM8",
		},
	};

	fetch(url, options)
		.then((res) => {
			return res.json();
		})
		.then((json) => console.log(json))
		.catch((err) => console.error("error:" + err));
};
