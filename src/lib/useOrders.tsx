import useSwr from 'swr';
import { Order, PaginationProps } from '../interfaces/types';

export const useOrders = () => {
  const { data, error, mutate } =
    useSwr<PaginationProps<Order[]>>('/order/list');
  const isLoading = !data && !error;

  return {
    orders: data,
    isLoading,
    mutate,
  };
};
