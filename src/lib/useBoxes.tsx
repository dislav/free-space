import useSwr from 'swr';

import { fetcher } from './api';
import { Box } from '../interfaces/types';

export const useBoxes = () => {
  const { data, error, mutate } = useSwr<Box[]>('/boxs', fetcher);
  const loading = !data && !error;

  return {
    boxes: data,
    loading,
    mutate,
  };
};
