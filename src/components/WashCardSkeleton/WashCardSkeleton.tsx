import React from 'react';
import { Skeleton } from '@chakra-ui/react';
import { Container } from './WashCardSkeleton.styled';

const WashCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} borderRadius={'6px'} />
    </Container>
  );
};

export default WashCardSkeleton;
