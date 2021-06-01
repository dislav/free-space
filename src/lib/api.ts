import axios, { AxiosPromise } from 'axios';

import { Auth, Response } from '../interfaces/types';

const apiUrl = process.env.REACT_APP_API_URL;

export const auth = (data: FormData): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/auth`, data);

export const fetchWashes = (): AxiosPromise<Response<Auth>> =>
  axios.post(`${apiUrl}/wash/list`);

export const createWash = (
  data: FormData
): AxiosPromise<
  Response<{
    owner_id: string;
    pass: string;
    nick: string;
    wash: string;
    group: boolean;
    link_wash: boolean;
  }>
> => axios.post(`${apiUrl}/wash/create`, data);
