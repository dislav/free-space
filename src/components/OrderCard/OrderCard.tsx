import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { Service, CarBody, Order } from '../../interfaces/types';
import { updateOrderStatus } from '../../lib/api';
import { useOrders } from '../../lib/useOrders';

import { Container, Column, Tag } from './OrderCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';
import Modal from '../Modal/Modal';

enum OrderStatus {
  Created,
  Accepted,
  Completed,
  Rejected,
}

interface IOrderCard extends Order {
  bodies?: CarBody[];
  servicesList?: Service[];
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
  uname,
  services,
  servicesList,
  status,
}) => {
  const { mutate } = useOrders();
  const { colors, variables } = useTheme();
  const toast = useToast();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [tagsModal, setTagsModal] = useState(false);

  const openRejectModal = () => setRejectModal(true);
  const closeRejectModal = () => setRejectModal(false);

  const openCompleteModal = () => setCompleteModal(true);
  const closeCompleteModal = () => setCompleteModal(false);

  const openTagsModal = () => setTagsModal(true);
  const closeTagsModal = () => setTagsModal(false);

  const onEditOrder = () => history.push(`/order/update/${id}`);

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
        1: '??????????????',
        2: '??????????????????',
        3: '????????????????',
      };

      toast({
        title: '??????????????',
        position: 'top-right',
        description: `???????????? ?????????????? ${statusText[+data.data.status]}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: '????????????',
        position: 'top-right',
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
        {tags && tags.length > 0 ? (
          <>
            {tags.map(({ id, name }, index) => {
              const formatName =
                name.length > 16 ? `${name.slice(0, 16)}...` : name;

              if (index < 3)
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
            })}
            {tags.length > 3 && (
              <Button
                fontSize={'14px'}
                h={'auto'}
                bg={colors.blue40}
                _hover={{
                  bg: colors.blue10,
                }}
                _active={{
                  bg: colors.blue10,
                }}
                borderRadius={variables.borderRadius}
                padding={'4px 10px'}
                onClick={openTagsModal}
              >
                ??????...
              </Button>
            )}
          </>
        ) : (
          '???'
        )}
      </Column>
      <Column>{phone.length > 0 ? phone : '???'}</Column>
      <Column>{uname.length > 0 ? uname : '???'}</Column>
      <Column>
        <span>???????? #</span>
        {box}
      </Column>
      <Column>{price.length > 0 ? `${price} ???` : '???'}</Column>
      {+status !== OrderStatus.Completed && (
        <DropdownMenu>
          {(+status === OrderStatus.Created ||
            +status === OrderStatus.Rejected) && (
            <DropdownMenuLink onClick={() => updateOrder(OrderStatus.Accepted)}>
              ??????????????
            </DropdownMenuLink>
          )}
          {+status === OrderStatus.Created && (
            <DropdownMenuLink onClick={openRejectModal}>
              ??????????????????
            </DropdownMenuLink>
          )}
          {+status === OrderStatus.Accepted && (
            <DropdownMenuLink onClick={openCompleteModal}>
              ??????????????????
            </DropdownMenuLink>
          )}
          {[OrderStatus.Created, OrderStatus.Accepted].includes(+status) && (
            <DropdownMenuLink onClick={onEditOrder}>
              ??????????????????????????
            </DropdownMenuLink>
          )}
        </DropdownMenu>
      )}

      <Modal
        title={'???????????????????? ????????????'}
        successText={'??????????????????'}
        isOpen={rejectModal}
        isLoading={isLoading}
        onClose={closeRejectModal}
        onSuccess={() => updateOrder(OrderStatus.Rejected, closeRejectModal)}
      >
        ???? ??????????????, ?????? ???????????? ?????????????????? ?????????????
      </Modal>
      <Modal
        title={'???????????????????? ????????????'}
        successText={'??????????????????'}
        isOpen={completeModal}
        isLoading={isLoading}
        onClose={closeCompleteModal}
        onSuccess={() => updateOrder(OrderStatus.Completed, closeCompleteModal)}
      >
        ???? ??????????????, ?????? ???????????? ?????????????????? ?????????????
      </Modal>
      <Modal title={'?????? ??????????'} isOpen={tagsModal} onClose={closeTagsModal}>
        {tags?.map(({ id, name }) => (
          <Tooltip
            key={id}
            label={name}
            hasArrow={true}
            textAlign={'center'}
            borderRadius={'4px'}
            lineHeight={'1.2'}
            padding={'6px 10px'}
          >
            <Tag>{name}</Tag>
          </Tooltip>
        ))}
      </Modal>
    </Container>
  );
};

export default OrderCard;
