import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Spinner, Textarea } from '@chakra-ui/react';
import useSwr from 'swr';

import { getChatMessagesById, sendMessage } from '../../lib/api';
import { ChatMessageProps } from '../../interfaces/types';

import {
  Container,
  Header,
  Content,
  ContentFooter,
  Message,
  Button,
} from './ChatBody.styled';
import { SendIcon, BackIcon } from '../../icons/icons';

interface Inputs {
  message: string;
}

interface IChatBody {
  id: string;
  userId?: string;
  clearChat?: () => void;
}

const ChatBody: React.FC<IChatBody> = ({ id, userId, clearChat }) => {
  const { data, error, mutate } = useSwr<ChatMessageProps[]>(
    `/message/pull/${id}?message_read=1`
  );
  const isChatLoading = !data && !error;

  const { colors, variables } = useTheme();
  const { handleSubmit, register, setValue } = useForm<Inputs>();

  const sortedMessages = useMemo(
    () => data?.sort((a, b) => +a.id - +b.id),
    [data]
  );

  const scrollToBottom = (target: HTMLDivElement | null) => {
    if (target) target.scrollTo(0, target.scrollHeight);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const responseMessage = await sendMessage(id, data.message);
      if (!responseMessage.data.status)
        throw new Error(responseMessage.data.message);

      const response = await getChatMessagesById(id);
      if (!response.data.status) throw new Error(responseMessage.data.message);

      mutate(response.data.data, false);
      setValue('message', '');
    } catch (e) {
      console.log(e.message);
    }
  };

  if (isChatLoading)
    return (
      <Container>
        <Spinner
          size={'xl'}
          thickness={'4px'}
          speed={'0.65s'}
          color={colors.blue40}
          margin={'auto'}
        />
      </Container>
    );

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Header>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={clearChat}>
          <BackIcon />
        </div>
        Пользователь #{userId}
      </Header>
      <Content ref={scrollToBottom}>
        {sortedMessages?.map(({ id, text, user }) => {
          const selfMessage = +user !== 0;
          return (
            <Message key={id} self={selfMessage}>
              {text}
            </Message>
          );
        })}
      </Content>
      <ContentFooter>
        <Textarea
          placeholder={'Введите сообщение'}
          borderRadius={variables.borderRadius}
          bg={colors.white}
          {...register('message')}
        />
        <Button>
          <SendIcon />
        </Button>
      </ContentFooter>
    </Container>
  );
};

export default ChatBody;
