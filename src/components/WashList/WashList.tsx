import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { getWashesRequest } from '../../store/washes/actions';

import { Container } from './WashList.styled';
import ListHeader from '../ListHeader/ListHeader';
import WashCard from '../WashCard/WashCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

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

  if (washes.washesStatus.status === 'failed')
    return <Container>Ошибка загрузки данных.</Container>;

  if (washes.washesStatus.status === 'loading')
    return (
      <Container>
        <ListHeader
          titles={['Название', 'Город', 'Заявки за неделю', 'Статус']}
        />
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <ListHeader
        titles={['Название', 'Город', 'Заявки за неделю', 'Статус']}
      />
      {washes.washes.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default connector(WashList);
