import React from 'react';

import { Promotion } from '../../interfaces/types';
import { Container, Column } from './PromotionCard.styled';
import { Switch } from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const PromotionCard: React.FC<Promotion> = ({ name, description, active }) => {
  return (
    <Container>
      <Column>{name}</Column>
      <Column>
        <Switch id={'active'} size={'lg'} defaultChecked={!!active} />
      </Column>
      <Column>{description}</Column>
      <DropdownMenu>
        <DropdownMenuLink>Редактировать</DropdownMenuLink>
        <hr />
        <DropdownMenuLink>Удалить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default PromotionCard;
