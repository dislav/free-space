import axios, { AxiosPromise } from 'axios';
import cookie from 'cookie';

import { Auth, Response, CreateWash } from '../interfaces/types';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetcher = (url: string) =>
  axios
    .get(`${apiUrl}${url}`, {
      params: { ukey28: cookie.parse(document.cookie)?.ukey28 },
    })
    .then((res) => res.data.data);

export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/auth`, data);

export const createWash = (
  data: FormData
): AxiosPromise<Response<CreateWash>> =>
  axios.post(`${apiUrl}/wash/create`, data);

export const createPromotion = (
  data: FormData
): AxiosPromise<Response<{ id: string }>> =>
  axios.post(`${apiUrl}/promo/create`, data);
