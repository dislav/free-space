import useSwr from 'swr';

import { Promotion } from '../interfaces/types';
import { fetcher } from './api';

export const usePromotion = () => {
  const { data, error } = useSwr<Promotion[]>('/promo/list', fetcher);
  const loading = !data && !error;

  return {
    promotions: data,
    loading,
  };
};
