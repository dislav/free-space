import React from 'react';

import Layout from '../components/Layout/Layout';
import OrderForm from '../components/OrderForm/OrderForm';

const Order: React.FC = () => {
  return (
    <Layout title={'Заказ'}>
      <OrderForm />
    </Layout>
  );
};

export default Order;
