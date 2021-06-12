import useSwr from 'swr';
import axios from 'axios';

import { Wash } from '../interfaces/types';

const fetcher = (url: string) =>
  axios
    .get(`${process.env.REACT_APP_API_URL}${url}`)
    .then((res) => res.data.data);

export const useWash = () => {
  const { data, mutate, error } = useSwr<Wash[]>('/wash/list', fetcher);

  const loading = !data && !error;
  const isLoggedIn = !error || error.status !== 403;

  return {
    washes: data,
    loading,
    isLoggedIn,
    mutate,
  };
};
