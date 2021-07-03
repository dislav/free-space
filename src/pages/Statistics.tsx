import React from 'react';

import Layout from '../components/Layout/Layout';
import StatisticsComponent from '../components/Statistics/Statistics';

const Statistics: React.FC = () => {
  return (
    <Layout title={'Статистика'}>
      <StatisticsComponent />
    </Layout>
  );
};

export default Statistics;
