import axios from 'axios';

 let domain ='http://localhost:4000'

 export const post_api = (url, data) => {
	const headers = {};
	return axios({
		method: 'post',
		url: domain+ `/${url}`,
		headers: headers,
		data
	})
		.then(response => {
			return Promise.resolve(response);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

export const get_api = (url, token = false) => {
	const headers = {};
	return axios({
		method: 'get',
		url: domain+ `/${url}`,
		headers: headers
	})
		.then(response => {
			return Promise.resolve(response);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};