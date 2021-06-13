import React from 'react';

import Layout from '../components/Layout/Layout';
import BoxesList from '../components/BoxesList/BoxesList';
import LinkButton from '../components/LinkButton/LinkButton';

const Boxes = () => {
  return (
    <Layout
      title={'Боксы'}
      action={<LinkButton to={'#'} onClick={() => console.log(1)} />}
    >
      <BoxesList />
    </Layout>
  );
};

export default Boxes;
