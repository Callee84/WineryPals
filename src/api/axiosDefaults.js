import axios from "axios";

axios.defaults.baseURL = 'https://winerypals.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRef = axios.create();