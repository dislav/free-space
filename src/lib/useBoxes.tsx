import useSwr from 'swr';

import { Box, PaginationProps } from '../interfaces/types';

export const useBoxes = () => {
  const { data, error, mutate } = useSwr<PaginationProps<Box[]>>('/boxs');
  const loading = !data && !error;

  return {
    boxes: data,
    loading,
    mutate,
  };
};
