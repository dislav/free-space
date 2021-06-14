import useSwr from 'swr';

import { Box } from '../interfaces/types';

export const useBoxes = () => {
  const { data, error, mutate } = useSwr<Box[]>('/boxs');
  const loading = !data && !error;

  return {
    boxes: data,
    loading,
    mutate,
  };
};
