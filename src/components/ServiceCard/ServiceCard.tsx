import React, { useState } from 'react';

import { Service, ServicePrice } from '../../interfaces/types';

import { Container, Column } from './ServiceCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';

interface IServiceCard extends Service {
  prices?: ServicePrice[];
}

const ServiceCard: React.FC<IServiceCard> = ({ id, name, about, prices }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const filterPrices = prices?.filter(({ service_id }) => service_id === id);

  const numPrices: number[] = [];
  filterPrices?.forEach(({ price }) => price?.length && numPrices.push(+price));

  const minPrice = Math.min(...numPrices);
  const maxPrice = Math.max(...numPrices);

  return (
    <Container>
      <Column>{name}</Column>
      <Column>Действует</Column>
      <Column>{about}</Column>
      <Column>
        {minPrice} — {maxPrice} ₽
      </Column>
      <DropdownMenu>
        <DropdownMenuLink>Изменить</DropdownMenuLink>
        <hr />
        <DropdownMenuLink onClick={openModal}>Удалить</DropdownMenuLink>
      </DropdownMenu>
      <Modal
        title={'Удаление услуги'}
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={() => console.log(1)}
        closeOnEsc={true}
      >
        Вы уверены, что хотите удалить услугу «{name}»?
      </Modal>
    </Container>
  );
};

export default ServiceCard;
