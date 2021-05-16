import axios, { AxiosPromise } from 'axios';
import { Auth, Response } from '../interfaces/types';

const apiUrl = process.env.REACT_APP_API_URL;

export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/auth`, data);

export const fetchWashes = (): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/wash/list`);
