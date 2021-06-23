import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { Box } from '../../interfaces/types';
import { activateBox } from '../../lib/api';
import { useBoxes } from '../../lib/useBoxes';

import { Container, Column } from './BoxCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';

interface IBoxCard extends Box {
  number: number;
}

const BoxCard: React.FC<IBoxCard> = ({ id, active, number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenActiveModal, setIsOpenActiveModal] = useState(false);
  const toast = useToast();

  const { mutate } = useBoxes();

  const openActiveModal = () => setIsOpenActiveModal(true);

  const closeActiveModal = () => setIsOpenActiveModal(false);

  const activateBoxRequest = async () => {
    setIsLoading(true);

    try {
      const { data } = await activateBox(id);
      if (!data.status) throw new Error(data.message);

      setIsLoading(false);
      toast({
        title: 'Успешно',
        description: `Бокс #${number} успешно ${
          !active ? 'активирован' : 'деактивирован'
        }.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      mutate();
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Column>Бокс #{number}</Column>
      <Column>{!active ? 'Неактивен' : 'Активен'}</Column>
      <DropdownMenu>
        <DropdownMenuLink onClick={openActiveModal}>
          {!active ? 'Активировать' : 'Деактивировать'}
        </DropdownMenuLink>
      </DropdownMenu>
      <Modal
        title={`${!active ? 'Активирование' : 'Деактивирование'} бокса`}
        isOpen={isOpenActiveModal}
        onClose={closeActiveModal}
        onSuccess={activateBoxRequest}
        successText={!active ? 'Активировать' : 'Деактивировать'}
        isLoading={isLoading}
        closeOnEsc={true}
      >
        Вы уверены, что хотите {!active ? 'активировать' : 'деактивировать'}{' '}
        Бокс #{number}?
      </Modal>
    </Container>
  );
};

export default BoxCard;
