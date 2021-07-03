import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import PromotionForm from '../components/PromotionForm/PromotionForm';

const CreatePromotion: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const title = id ? 'Редактирование' : 'Добавление';

  return (
    <Layout title={`Акция - ${title}`}>
      <PromotionForm />
    </Layout>
  );
};

export default CreatePromotion;
