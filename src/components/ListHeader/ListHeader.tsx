import React from 'react';

import { Container, Column } from './ListHeader.styled';

interface IListHeader {
  titles: string[];
}

const ListHeader: React.FC<IListHeader> = ({ titles }) => {
  return (
    <Container>
      {titles.map((title, index) => (
        <Column key={index}>{title}</Column>
      ))}
    </Container>
  );
};

export default ListHeader;
