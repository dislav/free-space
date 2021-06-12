import axios, { AxiosPromise } from 'axios';

import { Auth, Response, CreateWash } from '../interfaces/types';

const apiUrl = process.env.REACT_APP_API_URL;

export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/auth`, data);

export const createWash = (
  data: FormData
): AxiosPromise<Response<CreateWash>> =>
  axios.post(`${apiUrl}/wash/create`, data);
