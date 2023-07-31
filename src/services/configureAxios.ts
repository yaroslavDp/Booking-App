import axios from "axios";
import configureServer from './configureServer.json';


export const fetchAxios = axios.create({
    baseURL: configureServer.serviceURL,
    headers: {
		"Content-Type": "application/json"
	}
})

fetchAxios.interceptors.request.use((request) => {
    if (localStorage.getItem('access_token')) {
        const token: string|null = localStorage.getItem('access_token')
        request.headers['Authorization'] = `Bearer ${JSON.parse(token || '')}`
        return request
    }
      return request
})
