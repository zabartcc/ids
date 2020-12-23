import axios from 'axios';

export const zabApi = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});