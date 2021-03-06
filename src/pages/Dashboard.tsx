import React from 'react';
import Layout from '../components/Layout/Layout';
import WashList from '../components/WashList/WashList';
import LinkButton from '../components/LinkButton/LinkButton';
import OrdersList from '../components/OrdersList/OrdersList';

const Dashboard: React.FC = () => {
  const isAdmin = localStorage.getItem('group') === '1';

  if (isAdmin)
    return (
      <Layout title={'Объекты'} action={<LinkButton to={'/wash/create'} />}>
        <WashList />
      </Layout>
    );

  return (
    <Layout title={'Заявки'} action={<LinkButton to={'/order/create'} />}>
      <OrdersList />
    </Layout>
  );
};

export default Dashboard;
