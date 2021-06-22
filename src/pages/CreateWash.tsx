import React from 'react';

import Layout from '../components/Layout/Layout';
import CreateWashForm from '../components/CreateWash/CreateWash';

const CreateWash = () => {
  return (
    <Layout title={'Добавить новый объект'}>
      <CreateWashForm />
    </Layout>
  );
};

export default CreateWash;
