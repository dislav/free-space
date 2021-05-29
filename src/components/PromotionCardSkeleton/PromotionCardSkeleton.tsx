import React from 'react';

import { Container } from './PromotionCardSkeleton.styled';
import { Skeleton } from '@chakra-ui/react';

const PromotionCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton flex={'1 1 60%'} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={'1 1 40%'} h={'14px'} mr={'40px'} borderRadius={'6px'} />
      <Skeleton flex={'1 1 140%'} h={'14px'} mr={'40px'} borderRadius={'6px'} />
    </Container>
  );
};

export default PromotionCardSkeleton;
