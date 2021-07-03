import React from 'react';
import { useToast } from '@chakra-ui/react';

import { createBox } from '../lib/api';
import { useBoxes } from '../lib/useBoxes';

import Layout from '../components/Layout/Layout';
import BoxesList from '../components/BoxesList/BoxesList';
import LinkButton from '../components/LinkButton/LinkButton';

const Boxes: React.FC = () => {
  const { boxes, loading, mutate } = useBoxes();
  const toast = useToast();

  const onClick = async () => {
    try {
      const { data } = await createBox();
      if (!data?.status) throw new Error(data.message);

      toast({
        title: 'Успешно',
        position: 'top-right',
        description: 'Бокс успешно создан.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      mutate();
    } catch (e) {
      toast({
        position: 'top-right',
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const boxCount = boxes?.list.length || 0;

  return (
    <Layout
      title={'Боксы'}
      action={
        boxCount < 10 && !loading && <LinkButton to={'#'} onClick={onClick} />
      }
    >
      <BoxesList />
    </Layout>
  );
};

export default Boxes;
