import useSwr from 'swr';
import { Order } from '../interfaces/types';

export const useOrders = () => {
  const { data, error, mutate } = useSwr<Order[]>('/order/list');
  const isLoading = !data && !error;

  return {
    orders: data,
    isLoading,
    mutate,
  };
};
