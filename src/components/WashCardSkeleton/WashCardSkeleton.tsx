import React from 'react';
import { Skeleton } from '@chakra-ui/react';
import { Container } from './WashCardSkeleton.styled';

const WashCardSkeleton: React.FC = () => {
  return (
    <Container>
      <Skeleton
        flex={1}
        maxW={['60%', '60%', '100%']}
        minH={'14px'}
        mr={['0', '0', '40px']}
        mb={['10px', '10px', '0']}
        borderRadius={'6px'}
      />
      <Skeleton
        flex={1}
        maxW={['40%', '40%', '100%']}
        minH={'14px'}
        mr={['0', '0', '40px']}
        mb={['60px', '60px', '0']}
        borderRadius={'6px'}
      />
      <Skeleton
        flex={1}
        maxW={['50%', '50%', '100%']}
        minH={'14px'}
        mr={['0', '0', '40px']}
        borderRadius={'6px'}
      />
      <Skeleton
        display={['none', 'none', 'block']}
        flex={1}
        minH={'14px'}
        borderRadius={'6px'}
      />
    </Container>
  );
};

export default WashCardSkeleton;
