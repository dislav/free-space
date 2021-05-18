import React from 'react';
import { Skeleton } from '@chakra-ui/react';
import { Container } from './WashCardSkeleton.styled';

const WashCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} borderRadius={'20px'} />
    </Container>
  );
};

export default WashCardSkeleton;
