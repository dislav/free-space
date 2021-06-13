import useSwr from 'swr';

import { fetcher } from './api';
import { BaseService } from '../interfaces/types';

export const useServices = () => {
  const { data, error } = useSwr<{
    list: BaseService[];
    guide: any[];
    price: any[];
  }>('/services', fetcher);
  const loading = !data && !error;

  return {
    services: data,
    loading,
  };
};
