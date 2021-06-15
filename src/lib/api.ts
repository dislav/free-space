import axios, { AxiosPromise, AxiosResponse } from 'axios';
import cookie from 'cookie';

import { Auth, Response, CreateWash, Box } from '../interfaces/types';

// Basic
const apiUrl = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({ baseURL: apiUrl });

const getToken = (): string | undefined =>
  cookie.parse(document.cookie)?.ukey28;

// Fetcher for useSwr
export const fetcher = async (url: string) => {
  const response: AxiosResponse<Response> = await axiosInstance.get(url, {
    params: { ukey28: getToken() },
  });

  if (response.statusText !== 'OK') {
    const error = new Error();
    error.message = 'An error occurred while fetching the data.';
    throw error;
  }

  return response.data.data;
};

// Api
export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axiosInstance.post('/auth', data);

export const createWash = (
  data: FormData
): AxiosPromise<Response<CreateWash>> =>
  axiosInstance.post('/wash/create', data, {
    params: { ukey28: getToken() },
  });

export const createPromotion = (
  data: FormData
): AxiosPromise<Response<{ id: string }>> =>
  axiosInstance.post('/promo/create', data, {
    params: { ukey28: getToken() },
  });

export const createBox = (): AxiosPromise<Response<Box>> =>
  axiosInstance.post('/add/box', null, {
    params: { ukey28: getToken() },
  });

export const createService = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/add/service', data, {
    params: { ukey28: getToken() },
  });

export const activateBox = (id: string): AxiosPromise<Response> =>
  axiosInstance.post(`/box/active/${id}`, null, {
    params: { ukey28: getToken() },
  });

export const activatePromotion = (id: string): AxiosPromise<Response> =>
  axiosInstance.post(`/promo/active/${id}`, null, {
    params: { ukey28: getToken() },
  });

export const updateProfile = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/profile/update', data, {
    params: { ukey28: getToken() },
  });
