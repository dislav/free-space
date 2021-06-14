import React from 'react';
import { Tooltip } from '@chakra-ui/react';

import { BaseService, CarBody, Order } from '../../interfaces/types';
import { Container, Column, Tag } from './OrderCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

interface IOrderCard extends Order {
  bodies?: CarBody[];
  servicesList?: BaseService[];
}

const OrderCard: React.FC<IOrderCard> = ({
  body,
  bodies,
  date,
  time,
  phone,
  box,
  price,
  services,
  servicesList,
}) => {
  const carBody = bodies?.find(({ id }) => id === body);
  const tags = servicesList?.filter(({ id }) =>
    services.find((serviceId) => serviceId === id)
  );

  return (
    <Container>
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
      <DropdownMenu>
        <DropdownMenuLink>Принять</DropdownMenuLink>
        <DropdownMenuLink>Отклонить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default OrderCard;
