import axios, { AxiosPromise, AxiosResponse } from 'axios';
import cookie from 'cookie';

import {
  Auth,
  Response,
  CreateWash,
  Box,
  Order,
  Service,
  Wash,
  GeoCode,
  Promotion,
  ChatMessageProps,
  PaginationProps,
} from '../interfaces/types';

// Basic
const apiUrl = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({ baseURL: apiUrl });

const getToken = (): string | undefined =>
  cookie.parse(document.cookie)?.ukey28;

// SWR
export const fetcher = async (url: string, limitPage?: number) => {
  const response: AxiosResponse<Response> = await axiosInstance.get(url, {
    params: { ukey28: getToken(), limit_page: limitPage },
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

export const createOrder = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/order/create', data, {
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

export const updateProfileImage = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/wash/photo', data, {
    params: { ukey28: getToken() },
  });

export const updateOrderStatus = (
  id: string,
  status: number
): AxiosPromise<Response<Order>> =>
  axiosInstance.post(`/order/${id}/status/${status}`, null, {
    params: { ukey28: getToken() },
  });

export const updateOrder = (
  id: string,
  data: FormData
): AxiosPromise<Response> =>
  axiosInstance.post(`/order/update/${id}`, data, {
    params: { ukey28: getToken() },
  });

export const activateService = (id: string): AxiosPromise<Response<Service>> =>
  axiosInstance.post(`/service/active/${id}`, null, {
    params: { ukey28: getToken() },
  });

export const getOrders = (
  params: any
): AxiosPromise<Response<PaginationProps<Wash[]>>> =>
  axiosInstance.get('/wash/list', {
    params: {
      ukey28: getToken(),
      ...params,
    },
  });

export const activeWash = (id: string): AxiosPromise<Response<Wash>> =>
  axiosInstance.post(`/wash/active/${id}`, null, {
    params: { ukey28: getToken() },
  });

export const getGeoCodeByAddress = (
  address: string
): AxiosPromise<Response<GeoCode>> =>
  axiosInstance.get('/geocode', {
    params: {
      ukey28: getToken(),
      q: address,
    },
  });

export const updatePassword = (data: FormData): AxiosPromise<Response> =>
  axiosInstance.post('/password', data, {
    params: { ukey28: getToken() },
  });

export const updateWash = (
  id: string,
  data: FormData
): AxiosPromise<Response<CreateWash>> =>
  axiosInstance.post(`/wash/update/${id}`, data, {
    params: { ukey28: getToken() },
  });

export const updatePromotion = (
  id: string,
  data: FormData
): AxiosPromise<Response<Promotion>> =>
  axiosInstance.post(`/promo/update/${id}`, data, {
    params: { ukey28: getToken() },
  });

export const updateService = (
  id: string,
  data: FormData
): AxiosPromise<Response<Promotion>> =>
  axiosInstance.post(`/service/update/${id}`, data, {
    params: { ukey28: getToken() },
  });

export const getStatistics = (
  days = '30',
  params?: any
): AxiosPromise<Response> =>
  axiosInstance.get(`/stat/all/${days}`, {
    params: {
      ...params,
      ukey28: getToken(),
    },
  });

export const getStatisticsById = (
  id: string,
  days = '30',
  params?: any
): AxiosPromise<Response> =>
  axiosInstance.get(`/stat/get/${id}/${days}?`, {
    params: {
      ...params,
      ukey28: getToken(),
    },
  });

export const getChatMessagesById = (
  id: string
): AxiosPromise<Response<ChatMessageProps[]>> =>
  axiosInstance.get(`/message/pull/${id}`, {
    params: { ukey28: getToken() },
  });

export const sendMessage = (id: string, text: string): AxiosPromise<Response> =>
  axiosInstance.post(`/message/send/${id}`, null, {
    params: {
      text,
      user: 1,
    },
  });
