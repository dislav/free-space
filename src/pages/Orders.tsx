import React from 'react';
import Layout from '../components/Layout/Layout';
import OrdersList from '../components/OrdersList/OrdersList';

const Orders = () => {
  return (
    <Layout title={'Заказы'}>
      <OrdersList />
    </Layout>
  );
};

export default Orders;
