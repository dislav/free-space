import useSwr from 'swr';

import { Wash } from '../interfaces/types';
import { fetcher } from './api';

export const useWash = () => {
  const { data, error } = useSwr<Wash[]>('/wash/list', fetcher);
  const loading = !data && !error;

  return {
    washes: data,
    loading,
  };
};
