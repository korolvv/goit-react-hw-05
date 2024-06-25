import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

axios.defaults.headers = {
	common: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGM2MjEwMGU2NjU5ZTc5MGVmYmZhNTUyNjQwNDUyZSIsInN1YiI6IjY2NjQ1NGJiZTQ2MjY3OGY3ZTEzNjRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMCfxHw564MWApeNmBXlYiBHpR1Bwb0y3xuQdIcFyM8",
	},
};

export const getTrends = async () => {
	const response = await axios.get("/trending/movie/day", {
		params: {
			language: "en-US",
		},
	});
	return response.data;
};

export const getMovieDetails = async (id) => {
	const response = await axios.get(`/movie/${id}`, {
		params: {
			language: "en-US",
		},
	});
	return response.data;
};

export const getMoviesByQuery = async (request) => {
	if (request) {
		const response = await axios.get("/search/movie", {
			params: {
				query: request,
				include_adult: false,
				language: "en-US",
			},
		});
		return response.data;
	}
};

export const getMovieReviews = async (id) => {
	const response = await axios.get(`/movie/${id}/reviews`);
	return response.data;
};

export const getMovieCast = async (id) => {
	const response = await axios.get(`/movie/${id}/credits`);
	return response.data;
};
