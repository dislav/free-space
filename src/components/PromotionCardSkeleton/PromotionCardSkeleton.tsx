import React from 'react';

import { Container } from './PromotionCardSkeleton.styled';
import { Skeleton } from '@chakra-ui/react';

const PromotionCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={20} borderRadius={'6px'} />
    </Container>
  );
};

export default PromotionCardSkeleton;
