import React from 'react';

import { Box } from '../../interfaces/types';
import { Container, Column } from './BoxCard.styled';

const BoxCard: React.FC<Box> = ({ id, active }) => {
  return (
    <Container>
      <Column>Бокс #{id}</Column>
      <Column>{!active ? 'Неактивен' : 'Активен'}</Column>
    </Container>
  );
};

export default BoxCard;
