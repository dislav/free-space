import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { BaseUser, WashUser } from '../../interfaces/types';
import { useProfile } from '../../lib/useProfile';
import { updateProfile } from '../../lib/api';

import { Container, Column, Time } from './ProfileForm.styled';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import WithGroup from '../WithGroup/WithGroup';

interface Inputs {
  name?: string;
  image?: string;
  street?: string;
  phone: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  startTime?: string;
  endTime?: string;
}

const TimeOptions = () => (
  <>
    {[...Array(24).keys()].map((key) => (
      <option key={key} value={key}>
        {key < 10 ? `0${key}` : key}
      </option>
    ))}
  </>
);

const ProfileForm: React.FC = () => {
  const { profile, loading, mutate } = useProfile();

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
  } = methods;

  const { t } = useTranslation('Profile');
  const { colors, variables, breakpoints } = useTheme();
  const toast = useToast();

  const newPassword = watch('newPassword', '');

  const isWashUser = (user?: BaseUser | WashUser): user is WashUser =>
    (user as WashUser)?.street !== undefined;

  const phoneFormat = (value: string) => {
    const phone = value.replace(/[^\d]/g, '');
    if (/^\d{11}$/.test(phone))
      return `${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(
        4,
        7
      )} ${phone.slice(7, 11)}`;
    return phone;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await updateProfile(formData);
      if (!response.data.status) throw new Error(response.data.message);

      mutate();
      setIsLoading(false);
      toast({
        title: 'Успешно',
        description: 'Профиль успешно обновлен',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <></>;

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <Column>
          <h2>{t('Washing information')}</h2>
          <WithGroup available={['2']}>
            <p>Загрузите логотип вашей автомойки</p>
            <ProfileAvatar />
            <FormControl
              isInvalid={!!errors.name}
              mb={['20px', '20px', '32px']}
            >
              <Input
                h={['44px', '44px', '58px']}
                bg={colors.white}
                borderRadius={variables.borderRadius}
                placeholder={t('Car wash name')}
                defaultValue={isWashUser(profile) ? profile?.name : ''}
                {...register('name', {
                  required: `${t('Required field')}`,
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.street}
              mb={['20px', '20px', '32px']}
            >
              <Input
                h={['44px', '44px', '58px']}
                bg={colors.white}
                borderRadius={variables.borderRadius}
                placeholder={t('Address')}
                defaultValue={isWashUser(profile) ? profile?.street : ''}
                {...register('street', {
                  required: `${t('Required field')}`,
                })}
              />
              <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
            </FormControl>
          </WithGroup>
          <FormControl isInvalid={!!errors.phone} mb={['20px', '20px', '32px']}>
            <Controller
              name={'phone'}
              control={control}
              defaultValue={profile?.phone ? phoneFormat(profile?.phone) : ''}
              rules={{
                required: 'Обязательное поле',
              }}
              render={({ field: { onChange, ...field } }) => (
                <Input
                  minH={'44px'}
                  borderRadius={'18px'}
                  placeholder={'Телефон'}
                  bg={'white'}
                  maxLength={16}
                  onChange={({ target }) => onChange(phoneFormat(target.value))}
                  {...field}
                />
              )}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
          <WithGroup available={['2']}>
            <Time>
              <p>{t('Working hours (start - end of the working day)')}</p>
              <FormControl isInvalid={!!errors.startTime} w={'30%'}>
                <Select
                  h={['44px', '44px', '58px']}
                  borderRadius={variables.borderRadius}
                  defaultValue={'8'}
                  bg={colors.white}
                  {...register('startTime', {
                    required: `${t('Required field')}`,
                  })}
                >
                  <TimeOptions />
                </Select>
                <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
              </FormControl>
              <span>—</span>
              <FormControl isInvalid={!!errors.endTime} w={'30%'}>
                <Select
                  h={['44px', '44px', '58px']}
                  borderRadius={variables.borderRadius}
                  defaultValue={'18'}
                  bg={colors.white}
                  {...register('endTime', {
                    required: `${t('Required field')}`,
                  })}
                >
                  <TimeOptions />
                </Select>
                <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
              </FormControl>
            </Time>
          </WithGroup>
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
              isLoading={isLoading}
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
              isLoading={isLoading}
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
