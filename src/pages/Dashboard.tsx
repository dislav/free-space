import React from 'react';
import Layout from '../components/Layout';
import WashList from '../components/WashList';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Layout title={'Объекты'} action={<Button borderRadius={'50%'} ml={'auto'}>+</Button>}>
      <WashList />
    </Layout>
  );
};

export default Dashboard;
