import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { Container } from './OrderCardSkeleton.styled';

const OrderCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={1} h={'14px'} mr={'40px'} borderRadius={'6px'} />
    </Container>
  );
};

export default OrderCardSkeleton;
