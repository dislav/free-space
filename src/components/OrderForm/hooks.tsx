import { useCallback, useState } from 'react';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form';

import { FormValues } from './types';
import { createOrder, updateOrder } from '../../lib/api';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

type CreateOrUpdateQueryProps = [
  (data: UnpackNestedValue<FormValues>) => Promise<Response>,
  { isLoading: boolean }
];

export const useCreateOfUpdateOrderQuery = (
  id?: string,
  mutate?: () => void
): CreateOrUpdateQueryProps => {
  const toast = useToast();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      const formData = new FormData();
      const newDate = {
        ...data,
        services: `[${data.services.join(',')}]`,
        date: dayjs(data.date).format('YYYY-MM-DD'),
        time: dayjs(data.date).format('HH:mm'),
      };

      Object.entries(newDate).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (!id) {
        try {
          const response = await createOrder(formData);
          if (!response.data.status) throw new Error(response.data.message);

          toast({
            title: 'Успешно',
            position: 'top-right',
            description: 'Заявка успешно создана.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => history.push('/'), 200);
        } catch (e) {
          toast({
            title: 'Ошибка',
            position: 'top-right',
            description: e.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const response = await updateOrder(id, formData);
          if (!response.data.status) throw new Error(response.data.message);

          mutate?.();

          toast({
            title: 'Успешно',
            position: 'top-right',
            description: 'Заявка успешно обновлена.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => history.push('/'), 200);
        } catch (e) {
          toast({
            title: 'Ошибка',
            position: 'top-right',
            description: e.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
    [id, mutate, isLoading]
  );

  return [onSubmit, { isLoading }];
};
