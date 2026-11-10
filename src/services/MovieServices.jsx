import axios from "axios";

const API_URL = "http://localhost:3000/movies";

export const getMovies = async () => (await axios.get(API_URL)).data;
export const getMovieById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const addMovie = async (movie) => (await axios.post(API_URL, movie)).data;
export const updateMovie = async (id, movie) => (await axios.put(`${API_URL}/${id}`, movie)).data;
export const deleteMovie = async (id) => { await axios.delete(`${API_URL}/${id}`); };