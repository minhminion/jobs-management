import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import queryString from 'query-string'
import { cookie } from "../utils";

export const axiosClient = axios.create({
  baseURL: 'https://jobs-api-heroku-00.herokuapp.com/api/v1',
  headers: {
    'Content-type': 'application/json'
  },
  paramsSerializer: queryString.stringify
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error: AxiosError) {
  // Do something with request error
  return Promise.reject(error.code);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error: AxiosError) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export function authHeader(): AxiosRequestHeaders {
  const token = cookie.getCookie('token')
  if(token) return { Authorization: `Bearer ${token}`}
  return {}
}