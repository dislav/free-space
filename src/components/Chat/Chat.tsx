import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import useSwr from 'swr';

import { ChatProps } from '../../interfaces/types';

import {
  Container,
  Sidebar,
  Header,
  Logo,
  LogoText,
  TabsWrapper,
} from './Chat.styled';
import { ChatLogo } from '../../icons/icons';
import ChatTab from '../ChatTab/ChatTab';
import ChatBody from '../ChatBody/ChatBody';

const Chat: React.FC = () => {
  const { data, error } = useSwr<ChatProps[]>('/message/chat');
  const chatsLoading = !data && !error;

  const { colors } = useTheme();

  const [currentChat, setCurrentChat] = useState<string | undefined>();

  useEffect(() => {
    if (data) setCurrentChat(data[0].key);
  }, [data]);

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
          <TabsWrapper>
            {data?.map(({ key: appId, ...props }) => (
              <ChatTab
                active={appId === currentChat}
                key={props.id}
                onClickTab={() => onSelectChat(appId)}
                {...props}
              />
            ))}
          </TabsWrapper>
        )}
      </Sidebar>
      {currentChat && (
        <ChatBody
          id={currentChat}
          userId={data?.find(({ key }) => key === currentChat)?.id}
          clearChat={() => setCurrentChat(undefined)}
        />
      )}
    </Container>
  );
};

export default Chat;
