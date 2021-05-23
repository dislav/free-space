import React from 'react';
import Layout from '../components/Layout/Layout';
import PromotionsList from '../components/PromotionsList/PromotionsList';

const Promotions = () => {
  return (
    <Layout title={'Акции'}>
      <PromotionsList />
    </Layout>
  );
};

export default Promotions;
