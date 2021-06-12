import useSwr from 'swr';
import axios from 'axios';
import cookie from 'cookie';
import { Promotion } from '../interfaces/types';

const fetcher = (url: string) =>
  axios
    .get(`${process.env.REACT_APP_API_URL}${url}`, {
      params: { ukey28: cookie.parse(document.cookie)?.ukey28 },
    })
    .then((res) => res.data.data);

export const usePromotion = () => {
  const { data, mutate, error } = useSwr<Promotion[]>('/promo/list', fetcher);

  const loading = !data && !error;
  const isLoggedIn = !error || error.status !== 403;

  return {
    promotions: data,
    loading,
    isLoggedIn,
    mutate,
  };
};
