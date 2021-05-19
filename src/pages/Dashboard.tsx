import React from 'react';
import Layout from '../components/Layout/Layout';
import WashList from '../components/WashList/WashList';
import LinkButton from '../components/LinkButton/LinkButton';

const Dashboard = () => {
  return (
    <Layout
      title={'Объекты'}
      action={<LinkButton to={'/wash/create'}>+</LinkButton>}
    >
      <WashList />
    </Layout>
  );
};

export default Dashboard;
