import axios from "axios";

const options = {
	method: "GET",
	url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM2MjEwMGU2NjU5ZTc5MGVmYmZhNTUyNjQwNDUyZSIsInN1YiI6IjY2NjQ1NGJiZTQ2MjY3OGY3ZTEzNjRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMCfxHw564MWApeNmBXlYiBHpR1Bwb0y3xuQdIcFyM8",
	},
};

export const getMovies = async (url) => {
	if (url !== undefined) {
		options.url = url;
	}
	const response = await axios.request(options);
	return response.data;
};

export const searchMovies = async (url, request) => {
	if (request) {
		options.url = url;
		options.params = {
			query: request,
			include_adult: false,
			language: "en-US",
		};
		const response = await axios.request(options);
		return response.data;
	}
};
