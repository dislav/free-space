import React from 'react';

import Layout from '../components/Layout/Layout';
import ServiceForm from '../components/ServiceForm/ServiceForm';

const CreateService = () => {
  return (
    <Layout title={'Услуги - Добавление'}>
      <ServiceForm />
    </Layout>
  );
};

export default CreateService;
