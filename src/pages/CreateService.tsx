import React from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import ServiceForm from '../components/ServiceForm/ServiceForm';

const CreateService = () => {
  const { id } = useParams<{ id?: string }>();
  const title = id ? 'Редактирование' : 'Добавление';

  return (
    <Layout title={`Услуги - ${title}`}>
      <ServiceForm />
    </Layout>
  );
};

export default CreateService;
