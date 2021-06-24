import React from 'react';
import dayjs from 'dayjs';

import { ChatProps } from '../../interfaces/types';
import { Container } from './ChatTab.styled';

interface IChatTab extends ChatProps {
  active?: boolean;
  onClickTab?: () => void;
}

const ChatTab: React.FC<IChatTab> = ({
  id,
  messagetime,
  active,
  onClickTab,
}) => {
  return (
    <Container onClick={onClickTab} active={active}>
      Пользователь #{id}
      <span>{dayjs.unix(+messagetime).format('DD.MM, hh:mm')}</span>
    </Container>
  );
};

export default ChatTab;
