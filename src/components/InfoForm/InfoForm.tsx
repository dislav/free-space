import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form';

import { BaseUser, WashUser } from '../../interfaces/types';
import { updateProfile, updateProfileImage } from '../../lib/api';

import { Container, Time } from './InfoForm.styled';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { useProfile } from '../../lib/useProfile';

interface Inputs {
  name: string;
  image: string;
  street: string;
  phone: string;
  startTime: string;
  endTime: string;
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

const InfoForm: React.FC = () => {
  const { profile, loading, mutate } = useProfile();

  const { t } = useTranslation('Profile');
  const { colors, variables } = useTheme();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

  const phoneFormat = (value: string) => {
    const phone = value.replace(/[^\d]/g, '');
    if (/^\d{11}$/.test(phone))
      return `${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(
        4,
        7
      )} ${phone.slice(7, 11)}`;
    return phone;
  };

  const isWashUser = (user?: BaseUser | WashUser): user is WashUser =>
    (user as WashUser)?.street !== undefined;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const { image, ...otherData } = data;

    const formData = new FormData();
    Object.entries(otherData).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await updateProfile(formData);
      if (!response.data.status) throw new Error(response.data.message);

      if (image) {
        const fileData = new FormData();
        console.log(image[0]);
        fileData.append('file', image[0]);

        const response = await updateProfileImage(fileData);
        if (!response.data.status) throw new Error(response.data.message);
      }

      mutate();
      toast({
        title: 'Успешно',
        description: 'Профиль успешно обновлен',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <></>;

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <h2>{t('Washing information')}</h2>
        <p>Загрузите логотип вашей автомойки</p>
        <ProfileAvatar
          imageUrl={
            profile?.pic
              ? `https://wash.rj28.ru/files/${profile.pic}`
              : undefined
          }
        />
        <FormControl isInvalid={!!errors.name} mb={['20px', '20px', '32px']}>
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
        <FormControl isInvalid={!!errors.street} mb={['20px', '20px', '32px']}>
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
      </FormProvider>
    </Container>
  );
};

export default InfoForm;
