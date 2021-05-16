import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

const WashCardSkeleton: React.FC = () => {
  return (
    <Box
      d={'flex'}
      alignItems={'center'}
      h={'100px'}
      p={'36px 80px'}
      bg={'gray.50'}
      borderRadius={'18px'}
    >
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} mr={20} borderRadius={'20px'} />
      <Skeleton flex={1} h={'20px'} borderRadius={'20px'} />
    </Box>
  );
};

export default WashCardSkeleton;
