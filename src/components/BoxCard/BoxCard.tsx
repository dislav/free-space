import React from 'react';

import { Container, Column } from './BoxCard.styled';

const BoxCard: React.FC = () => {
  return (
    <Container>
      <Column>Бокс #1</Column>
      <Column>Активен</Column>
    </Container>
  );
};

export default BoxCard;
