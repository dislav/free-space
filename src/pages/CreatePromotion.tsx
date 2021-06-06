import React from 'react';

import Layout from '../components/Layout/Layout';
import PromotionForm from '../components/PromotionForm/PromotionForm';

const CreatePromotion = () => {
  return (
    <Layout title={'Акция - Добавление'}>
      <PromotionForm />
    </Layout>
  );
};

export default CreatePromotion;
