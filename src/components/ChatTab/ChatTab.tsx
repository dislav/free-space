import React from 'react';
import dayjs from 'dayjs';

import { ChatProps } from '../../interfaces/types';
import { Container, UserTitle, NewCircle } from './ChatTab.styled';

interface IChatTab extends ChatProps {
  active?: boolean;
  isNew?: boolean;
  onClickTab?: () => void;
}

const ChatTab: React.FC<IChatTab> = ({
  id,
  messagetime,
  active,
  onClickTab,
  isNew,
}) => {
  return (
    <Container onClick={onClickTab} active={active}>
      <UserTitle>
        {isNew && <NewCircle />}
        Пользователь #{id}
      </UserTitle>
      <span>{dayjs.unix(+messagetime).format('DD.MM, hh:mm')}</span>
    </Container>
  );
};

export default ChatTab;
