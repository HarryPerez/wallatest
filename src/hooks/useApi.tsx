import axios, { AxiosRequestConfig } from 'axios';

export function apiCall<R>(path: string) {
  return api<R>(`${process.env.REACT_APP_API_URL}${path}`)
    .then((data) => data.data)
    .catch((error) => {
      return Promise.reject(error);
    });
}

function api<R>(path: string) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: path,
  };
  return axios.request<R>(axiosRequestConfig);
}
