import axios, { AxiosPromise, AxiosResponse } from 'axios';
import cookie from 'cookie';

import { Auth, Response, CreateWash, Box } from '../interfaces/types';

const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  params: { ukey28: cookie.parse(document.cookie)?.ukey28 },
});

export const fetcher = async (url: string) => {
  const response: AxiosResponse<Response> = await axiosInstance.get(url);

  if (response.statusText !== 'OK') {
    const error = new Error();
    error.message = 'An error occurred while fetching the data.';
    throw error;
  }

  return response.data.data;
};

export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axiosInstance.post('/auth', data);

export const createWash = (
  data: FormData
): AxiosPromise<Response<CreateWash>> =>
  axiosInstance.post('/wash/create', data);

export const createPromotion = (
  data: FormData
): AxiosPromise<Response<{ id: string }>> =>
  axiosInstance.post('/promo/create', data);

export const createBox = (): AxiosPromise<Response<Box>> =>
  axiosInstance.post('/add/box');

export const createService = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/add/service', data);

export const activateBox = (id: string): AxiosPromise<Response> =>
  axiosInstance.post(`/box/active/${id}`);

export const activatePromotion = (id: string): AxiosPromise<Response> =>
  axiosInstance.post(`/promo/active/${id}`);

export const updateProfile = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/profile/update', data);
