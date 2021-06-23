import React from 'react';

import { Container } from './ProfileForm.styled';
import WithGroup from '../WithGroup/WithGroup';
import InfoForm from '../InfoForm/InfoForm';
import PasswordForm from '../PasswordForm/PasswordForm';

const ProfileForm: React.FC = () => {
  return (
    <Container>
      <WithGroup available={['2']}>
        <InfoForm />
      </WithGroup>
      <PasswordForm />
    </Container>
  );
};

export default ProfileForm;
