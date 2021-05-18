import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import WashList from '../components/WashList/WashList';

const Dashboard = () => {
  return (
    <Layout title={'Объекты'} action={<Link to={'/create-wash'}>+</Link>}>
      <WashList />
    </Layout>
  );
};

export default Dashboard;
