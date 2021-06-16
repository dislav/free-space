import React, { useState } from 'react';
import { Tooltip, useToast } from '@chakra-ui/react';

import { BaseService, CarBody, Order } from '../../interfaces/types';
import { Container, Column, Tag } from './OrderCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';
import { updateOrderStatus } from '../../lib/api';
import { useOrders } from '../../lib/useOrders';

enum OrderStatus {
  Created,
  Accepted,
  Completed,
  Rejected,
}

interface IOrderCard extends Order {
  bodies?: CarBody[];
  servicesList?: BaseService[];
}

const OrderCard: React.FC<IOrderCard> = ({
  id,
  body,
  bodies,
  date,
  time,
  phone,
  box,
  price,
  services,
  servicesList,
  status,
}) => {
  const { mutate } = useOrders();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  const openRejectModal = () => setRejectModal(true);
  const closeRejectModal = () => setRejectModal(false);

  const openCompleteModal = () => setCompleteModal(true);
  const closeCompleteModal = () => setCompleteModal(false);

  const carBody = bodies?.find(({ id }) => id === body);
  const tags = servicesList?.filter(({ id }) =>
    services.find((serviceId) => serviceId === id)
  );

  const updateOrder = async (status: OrderStatus, cb?: () => void) => {
    setIsLoading(true);

    try {
      const { data } = await updateOrderStatus(id, status);
      if (!data.status) throw new Error(data.message);

      mutate();
      cb?.();

      const statusText: {
        [key: number]: string;
      } = {
        1: 'принята',
        2: 'завершена',
        3: 'отменена',
      };

      toast({
        title: 'Успешно',
        description: `Заявка успешно ${statusText[+data.data.status]}.`,
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
    <Container orderStatus={+status}>
      <Column>{carBody?.name}</Column>
      <Column>
        {date} {time}
      </Column>
      <Column>
        {tags && tags.length > 0
          ? tags.map(({ id, name }) => {
              const formatName =
                name.length > 16 ? `${name.slice(0, 16)}...` : name;
              return (
                <Tooltip
                  key={id}
                  label={name}
                  hasArrow={true}
                  textAlign={'center'}
                  borderRadius={'4px'}
                  lineHeight={'1.2'}
                  padding={'6px 10px'}
                >
                  <Tag>{formatName}</Tag>
                </Tooltip>
              );
            })
          : '—'}
      </Column>
      <Column>{phone.length > 0 ? phone : '—'}</Column>
      <Column>
        <span>Бокс #</span>
        {box}
      </Column>
      <Column>{price.length > 0 ? `${price} ₽` : '—'}</Column>
      {+status !== OrderStatus.Completed && (
        <DropdownMenu>
          {(+status === OrderStatus.Created ||
            +status === OrderStatus.Rejected) && (
            <DropdownMenuLink onClick={() => updateOrder(OrderStatus.Accepted)}>
              Принять
            </DropdownMenuLink>
          )}
          {+status === OrderStatus.Created && (
            <DropdownMenuLink onClick={openRejectModal}>
              Отклонить
            </DropdownMenuLink>
          )}
          {+status === OrderStatus.Accepted && (
            <DropdownMenuLink onClick={openCompleteModal}>
              Завершить
            </DropdownMenuLink>
          )}
        </DropdownMenu>
      )}

      <Modal
        title={'Отклонение заявки'}
        successText={'Отклонить'}
        isOpen={rejectModal}
        isLoading={isLoading}
        onClose={closeRejectModal}
        onSuccess={() => updateOrder(OrderStatus.Rejected, closeRejectModal)}
      >
        Вы уверены, что хотите отклонить заявку?
      </Modal>
      <Modal
        title={'Завершение заявки'}
        successText={'Завершить'}
        isOpen={completeModal}
        isLoading={isLoading}
        onClose={closeCompleteModal}
        onSuccess={() => updateOrder(OrderStatus.Completed, closeCompleteModal)}
      >
        Вы уверены, что хотите завершить заявку?
      </Modal>
    </Container>
  );
};

export default OrderCard;
