import React from 'react';

import Layout from '../components/Layout/Layout';
import LinkButton from '../components/LinkButton/LinkButton';
import ServicesList from '../components/ServicesList/ServicesList';

const Services: React.FC = () => {
  return (
    <Layout
      title={'Услуги'}
      action={<LinkButton to={'/service/create'}>+</LinkButton>}
    >
      <ServicesList />
    </Layout>
  );
};

export default Services;
