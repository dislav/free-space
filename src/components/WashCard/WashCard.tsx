import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { mutate } from 'swr';

import { Wash } from '../../interfaces/types';
import { activeWash } from '../../lib/api';

import { Container, Column } from './WashCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';

const WashCard: React.FC<Wash> = ({ id, name, city, active }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenActiveModal, setIsOpenActiveModal] = useState(false);
  const toast = useToast();

  const isActive = !!+active;

  const openActiveModal = () => setIsOpenActiveModal(true);

  const closeActiveModal = () => setIsOpenActiveModal(false);

  const activateWashRequest = async () => {
    setIsLoading(true);

    try {
      const { data } = await activeWash(id);
      if (!data.status) throw new Error(data.message);

      setIsLoading(false);
      toast({
        title: 'Успешно',
        description: `Мойка «${name}» успешно ${
          !isActive ? 'активирована' : 'деактивирована'
        }.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      mutate('/wash/list');
      closeActiveModal();
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
      <Column>{name}</Column>
      <Column>{city}</Column>
      <Column>{isActive ? 'Активна' : 'Неактивна'}</Column>
      <DropdownMenu>
        <DropdownMenuLink>Статистика</DropdownMenuLink>
        <Link to={`/wash/update/${id}`}>
          <DropdownMenuLink>Редактировать</DropdownMenuLink>
        </Link>
        <hr />
        {isActive ? (
          <DropdownMenuLink onClick={openActiveModal}>
            Деактивировать
          </DropdownMenuLink>
        ) : (
          <DropdownMenuLink onClick={activateWashRequest}>
            Активировать
          </DropdownMenuLink>
        )}
      </DropdownMenu>
      <Modal
        title={`${!isActive ? 'Активирование' : 'Деактивирование'} мойки`}
        isOpen={isOpenActiveModal}
        onClose={closeActiveModal}
        onSuccess={activateWashRequest}
        successText={!isActive ? 'Активировать' : 'Деактивировать'}
        isLoading={isLoading}
        closeOnEsc={true}
      >
        Вы уверены, что хотите {!isActive ? 'активировать' : 'деактивировать'}{' '}
        мойку «{name}»?
      </Modal>
    </Container>
  );
};

export default WashCard;
