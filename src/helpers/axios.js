import axios from 'axios';

export const zabApi = axios.create({
	baseURL: 'https://devapi.zabartcc.org',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
});