import React from 'react';
import Layout from '../components/Layout/Layout';
import ProfileForm from '../components/ProfileForm/ProfileForm';

const Profile = () => {
  return (
    <Layout title={'Настройки'}>
      <ProfileForm />
    </Layout>
  );
};

export default Profile;
