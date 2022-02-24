import { create } from 'apisauce';

export const createApiWithURL = (baseURL: string) =>
  create({
    baseURL,
    timeout: 15000,
  });

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
});

export const headers = {
  AUTHORIZATION: 'Authorization',
};

export const setAuthHeader = (token: string) => api.setHeader(headers.AUTHORIZATION, `Bearer ${token}`);

export default api;
