import { useEffect } from 'react';
import useSwr from 'swr';

import { BaseUser, WashUser } from '../interfaces/types';

export const useProfile = () => {
  const { data, mutate, error } = useSwr<BaseUser | WashUser>('/profile');

  const loading = !data && !error;
  const isLoggedIn = !error && error?.status !== 401;

  useEffect(() => {
    if (data && isLoggedIn) localStorage.setItem('user', JSON.stringify(data));
  }, [data, isLoggedIn]);

  return {
    profile: data,
    loading,
    isLoggedIn,
    mutate,
  };
};
