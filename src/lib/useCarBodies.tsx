import useSwr from 'swr';

import { fetcher } from './api';
import { CarBody } from '../interfaces/types';

export const useCarBodies = () => {
  const { data, error } = useSwr<CarBody[]>('/guide/body', fetcher);
  const loading = !data && !error;

  return {
    bodies: data,
    loading,
  };
};
