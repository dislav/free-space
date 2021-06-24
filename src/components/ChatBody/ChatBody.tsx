import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Spinner, Textarea } from '@chakra-ui/react';
import useSwr from 'swr';

import { getChatMessagesById, sendMessage } from '../../lib/api';
import { ChatMessageProps } from '../../interfaces/types';

import {
  Container,
  Content,
  ContentFooter,
  Message,
  Button,
} from './ChatBody.styled';
import { SendIcon } from '../../icons/icons';

interface Inputs {
  message: string;
}

interface IChatBody {
  id: string;
}

const ChatBody: React.FC<IChatBody> = ({ id }) => {
  const { data, error, mutate } = useSwr<ChatMessageProps[]>(
    `/message/pull/${id}`
  );
  const isChatLoading = !data && !error;

  const { colors, variables } = useTheme();
  const { handleSubmit, register, setValue } = useForm<Inputs>();

  const sortedMessages = useMemo(
    () => data?.sort((a, b) => +a.id - +b.id),
    [data]
  );

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
      <Spinner
        size={'xl'}
        thickness={'4px'}
        speed={'0.65s'}
        color={colors.blue40}
        margin={'auto'}
      />
    );

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Content>
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
