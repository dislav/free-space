import useSwr from 'swr';

import { fetcher } from './api';
import { Order } from '../interfaces/types';

export const useOrders = () => {
  const { data, error } = useSwr<Order[]>('/order/list', fetcher);
  const loading = !data && !error;

  return {
    orders: data,
    loading,
  };
};
