import React from 'react';
import Layout from '../components/Layout/Layout';
import PromotionsList from '../components/PromotionsList/PromotionsList';
import LinkButton from '../components/LinkButton/LinkButton';

const Promotions = () => {
  return (
    <Layout title={'Акции'} action={<LinkButton to={'/create/promotion'} />}>
      <PromotionsList />
    </Layout>
  );
};

export default Promotions;
