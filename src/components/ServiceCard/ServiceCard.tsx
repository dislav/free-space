import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { useToast } from '@chakra-ui/react';

import { Service } from '../../interfaces/types';
import { activateService } from '../../lib/api';

import { Container, Column } from './ServiceCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';

const ServiceCard: React.FC<Service> = ({ id, name, about, price, active }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isActive = !!+active;
  const toast = useToast();

  const numPrices: number[] = [];
  Object.values(price)?.forEach(
    (value) => value?.length && numPrices.push(+value)
  );

  const minPrice = Math.min(...numPrices);
  const maxPrice = Math.max(...numPrices);

  const activateServiceRequest = async () => {
    setIsLoading(true);

    try {
      const { data } = await activateService(id);
      if (!data.status) throw new Error(data.message);

      mutate('/services');
      closeModal();

      toast({
        title: 'Успешно',
        description: `Услуга успешно ${
          !isActive ? 'активирована' : 'деактивирована'
        }.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Column>{name}</Column>
      <Column>{isActive ? 'Действует' : 'Неактивна'}</Column>
      <Column>{about}</Column>
      <Column>
        {minPrice} — {maxPrice} ₽
      </Column>
      <DropdownMenu>
        <Link to={`/services/update/${id}`}>
          <DropdownMenuLink>Редактировать</DropdownMenuLink>
        </Link>
        <hr />
        {!isActive ? (
          <DropdownMenuLink onClick={activateServiceRequest}>
            Активировать
          </DropdownMenuLink>
        ) : (
          <DropdownMenuLink onClick={openModal}>
            Деактивировать
          </DropdownMenuLink>
        )}
      </DropdownMenu>

      <Modal
        title={`${!isActive ? 'Активирование' : 'Деактивирование'} услуги`}
        successText={!isActive ? 'Активировать' : 'Деактивировать'}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={closeModal}
        onSuccess={activateServiceRequest}
        closeOnEsc={true}
      >
        Вы уверены, что хотите {!isActive ? 'активировать' : 'деактивировать'}{' '}
        услугу «{name}»?
      </Modal>
    </Container>
  );
};

export default ServiceCard;
