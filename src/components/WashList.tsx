import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import WashCard from './WashCard';
import WashCardSkeleton from './WashCardSkeleton';
import { RootState } from '../store/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { getWashesRequest } from '../store/washes/actions';

const mapStateToProps = ({ washes }: RootState) => ({ washes });

const mapDispatchToProps = {
  getWashesRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const WashList: React.FC<PropsFromRedux> = ({ washes, getWashesRequest }) => {
  useEffect(() => {
    getWashesRequest();
  }, []);

  if (washes.status === 'failed') return <Box>Ошибка загрузки данных.</Box>;

  if (washes.status === 'loading')
    return (
      <Box d={'flex'} flexDir={'column'}>
        <Box mb={10}>
          <WashCardSkeleton />
        </Box>
        <Box mb={10}>
          <WashCardSkeleton />
        </Box>
        <Box mb={10}>
          <WashCardSkeleton />
        </Box>
      </Box>
    );

  return (
    <Box d={'flex'} flexDir={'column'}>
      {washes.washes.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Box>
  );
};

export default connector(WashList);
