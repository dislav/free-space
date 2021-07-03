import React from 'react';

import Layout from '../components/Layout/Layout';
import ChatComponent from '../components/Chat/Chat';

const Chat: React.FC = () => {
  return (
    <Layout title={'Чат технической поддержки'}>
      <ChatComponent />
    </Layout>
  );
};

export default Chat;
