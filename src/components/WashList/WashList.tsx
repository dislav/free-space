import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { getWashesRequest } from '../../store/washes/actions';

import { Container, Titles } from './WashList.styled';
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

  if (washes.status === 'failed')
    return <Container>Ошибка загрузки данных.</Container>;

  if (washes.status === 'loading')
    return (
      <Container>
        <Titles>
          <div>Название</div>
          <div>Город</div>
          <div>Заявки за неделю</div>
          <div>Статус</div>
        </Titles>
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <Titles>
        <div>Название</div>
        <div>Город</div>
        <div>Заявки за неделю</div>
        <div>Статус</div>
      </Titles>
      {washes.washes.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default connector(WashList);
