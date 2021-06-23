import React from 'react';

import Layout from '../components/Layout/Layout';
import StatisticsComponent from '../components/Statistics/Statistics';

const Statistics = () => {
  return (
    <Layout title={'Статистика'}>
      <StatisticsComponent />
    </Layout>
  );
};

export default Statistics;
