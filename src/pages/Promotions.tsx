import React from 'react';

import Layout from '../components/Layout/Layout';
import PromotionsList from '../components/PromotionsList/PromotionsList';
import WithGroup from '../components/WithGroup/WithGroup';
import LinkButton from '../components/LinkButton/LinkButton';

const Promotions = () => {
  return (
    <Layout
      title={'Акции'}
      action={
        <WithGroup available={['2']}>
          <LinkButton to={'/create/promotion'} />
        </WithGroup>
      }
    >
      <PromotionsList />
    </Layout>
  );
};

export default Promotions;
