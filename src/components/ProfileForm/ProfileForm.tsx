import React from 'react';
import { useTheme } from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { Container, Column, Time } from './ProfileForm.styled';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

interface Inputs {
  name?: string;
  image: string;
  address: string;
  phone: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  startTime?: string;
  endTime?: string;
}

const ProfileForm: React.FC = () => {
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = methods;

  const { t } = useTranslation('Profile');
  const { colors, variables, breakpoints } = useTheme();

  const newPassword = watch('newPassword', '');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <Column>
          <h2>{t('Washing information')}</h2>
          <ProfileAvatar />
          <FormControl isInvalid={!!errors.name} mb={['20px', '20px', '32px']}>
            <Input
              h={['44px', '44px', '58px']}
              bg={colors.white}
              borderRadius={variables.borderRadius}
              placeholder={t('Car wash name')}
              {...register('name', {
                required: `${t('Required field')}`,
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.address}
            mb={['20px', '20px', '32px']}
          >
            <Input
              h={['44px', '44px', '58px']}
              bg={colors.white}
              borderRadius={variables.borderRadius}
              placeholder={t('Address')}
              {...register('address', {
                required: `${t('Required field')}`,
              })}
            />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phone} mb={['20px', '20px', '32px']}>
            <Input
              h={['44px', '44px', '58px']}
              bg={colors.white}
              borderRadius={variables.borderRadius}
              placeholder={t('Phone')}
              {...register('phone', {
                required: `${t('Required field')}`,
              })}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
          <Time>
            <p>{t('Working hours (start - end of the working day)')}</p>
            <FormControl isInvalid={!!errors.startTime} w={'30%'}>
              <Select
                h={['44px', '44px', '58px']}
                borderRadius={variables.borderRadius}
                defaultValue={'01'}
                bg={colors.white}
                {...register('startTime', {
                  required: `${t('Required field')}`,
                })}
              >
                <option value="01">01</option>
                <option value="02">02</option>
              </Select>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>
            <span>—</span>
            <FormControl isInvalid={!!errors.endTime} w={'30%'}>
              <Select
                h={['44px', '44px', '58px']}
                borderRadius={variables.borderRadius}
                defaultValue={'01'}
                bg={colors.white}
                {...register('endTime', {
                  required: `${t('Required field')}`,
                })}
              >
                <option value="01">01</option>
                <option value="02">02</option>
              </Select>
              <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
            </FormControl>
          </Time>
          <MediaQuery minWidth={breakpoints.xl}>
            <Button
              h={['50px', '50px', '60px']}
              bg={variables.blueGradient}
              borderRadius={variables.borderRadius}
              _hover={{
                bg: variables.blueGradient,
                opacity: 0.8,
              }}
              type={'submit'}
            >
              {t('Save')}
            </Button>
          </MediaQuery>
        </Column>
        <Column>
          <h2>{t('Safety')}</h2>
          <p>
            {t(
              'You can change your password. Enter the old password and set a new one.'
            )}
          </p>
          <Input
            h={['44px', '44px', '58px']}
            bg={colors.white}
            borderRadius={variables.borderRadius}
            mb={['20px', '20px', '32px']}
            type={'password'}
            placeholder={t('Old password')}
            {...register('oldPassword')}
          />
          <FormControl
            isInvalid={!!errors.newPassword}
            mb={['20px', '20px', '32px']}
          >
            <Input
              h={['44px', '44px', '58px']}
              bg={colors.white}
              borderRadius={variables.borderRadius}
              type={'password'}
              placeholder={t('New password')}
              {...register('newPassword', {
                minLength: {
                  value: 6,
                  message: `${t('Minimum value length')} 6`,
                },
              })}
            />
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.confirmPassword}
            mb={['20px', '20px', '32px']}
          >
            <Input
              h={['44px', '44px', '58px']}
              bg={colors.white}
              borderRadius={variables.borderRadius}
              type={'password'}
              placeholder={t('Password confirmation')}
              {...register('confirmPassword', {
                validate: (value) =>
                  value === newPassword || `${t('Password mismatch')}`,
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <MediaQuery maxWidth={breakpoints.xl}>
            <Button
              h={['50px', '50px', '60px']}
              bg={variables.blueGradient}
              borderRadius={variables.borderRadius}
              _hover={{
                bg: variables.blueGradient,
                opacity: 0.8,
              }}
              type={'submit'}
            >
              {t('Save')}
            </Button>
          </MediaQuery>
        </Column>
      </FormProvider>
    </Container>
  );
};

export default ProfileForm;
