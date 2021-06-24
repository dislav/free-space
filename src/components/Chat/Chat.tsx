import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import useSwr from 'swr';

import { ChatProps } from '../../interfaces/types';

import { Container, Sidebar, Header, Logo, LogoText } from './Chat.styled';
import { ChatLogo } from '../../icons/icons';
import ChatTab from '../ChatTab/ChatTab';
import ChatBody from '../ChatBody/ChatBody';

const Chat = () => {
  const { data, error } = useSwr<ChatProps[]>('/message/chat');
  const chatsLoading = !data && !error;

  const { colors } = useTheme();

  const [currentChat, setCurrentChat] = useState<string | undefined>();

  const onSelectChat = (id: string) => {
    setCurrentChat(id);
  };

  return (
    <Container>
      <Sidebar>
        <Header>
          <Logo>
            <ChatLogo />
          </Logo>
          <LogoText>
            <h3>Free Space</h3>
            <span>Тех. поддержка сервиса</span>
          </LogoText>
        </Header>
        {chatsLoading ? (
          <Spinner
            size={'xl'}
            thickness={'4px'}
            speed={'0.65s'}
            color={colors.blue40}
            margin={'auto'}
          />
        ) : (
          data?.map(({ key: appId, ...props }) => (
            <ChatTab
              active={appId === currentChat}
              key={props.id}
              onClickTab={() => onSelectChat(appId)}
              {...props}
            />
          ))
        )}
      </Sidebar>
      {currentChat && <ChatBody id={currentChat} />}
    </Container>
  );
};

export default Chat;
