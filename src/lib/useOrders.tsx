import useSwr from 'swr';
import { Order, PaginationProps } from '../interfaces/types';

export const useOrders = (page?: number) => {
  const { data, error, mutate } = useSwr<PaginationProps<Order[]>>(
    `/order/list${page && page > 1 ? `/${page}` : ''}`
  );
  const isLoading = !data && !error;

  return {
    orders: data,
    isLoading,
    mutate,
  };
};
