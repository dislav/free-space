import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  Select,
} from '@chakra-ui/react';
import { TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { DivIcon, LatLng } from 'leaflet';

import { Container, Form, FormTime, Map } from './CreateWash.styled';
import { RootState } from '../../store/rootReducer';
import { createWashRequest } from '../../store/washes/actions';

const mapStateToProps = ({ washes }: RootState) => ({
  washesStatus: washes.washesStatus.status,
});

const mapDispatchToProps = {
  createWashRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Inputs {
  name: string;
  city: string;
  street: string;
  phone: string;
  startTime: string;
  endTime: string;
}

const MarkerIcon = new DivIcon({
  iconSize: [30, 40],
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path
        fill="red"
        d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
    />
  </svg>`,
});

const MapComponent: React.FC<{ setMarketCoord: (latlng: LatLng) => void }> = ({
  setMarketCoord,
}) => {
  useMapEvent('click', ({ latlng }) => setMarketCoord(latlng));
  return null;
};

const CreateWash: React.FC<PropsFromRedux> = ({
  washesStatus,
  createWashRequest,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const [markerCoord, setMarketCoord] = useState<LatLng>();

  const { colors } = useTheme();
  const fields = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    const { phone, startTime, endTime, ...props } = data;
    const newData = {
      ...props,
      geoid: `${markerCoord?.lat}:${markerCoord?.lng}`,
    };

    Object.entries(newData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    createWashRequest(formData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <Input
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'Название объекта'}
            bg={colors.white}
            {...register('name', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.city} mb={'20px'}>
          <Select
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'Выберите город'}
            bg={'white'}
            {...register('city', {
              required: 'Обязательное поле',
            })}
          >
            <option value="Москва">Москва</option>
            <option value="Новокузнецк">Новокузнецк</option>
          </Select>
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.street} mb={'20px'}>
          <Input
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'Адрес'}
            bg={colors.white}
            {...register('street', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone} mb={'30px'}>
          <Input
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'Телефон'}
            bg={'white'}
            {...register('phone', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <FormTime>
          <p>Режим работы (начало - окончание рабочего дня)</p>
          <FormControl isInvalid={!!errors.startTime} w={'30%'}>
            <Select
              minH={'44px'}
              borderRadius={'18px'}
              defaultValue={'01'}
              bg={'white'}
              {...register('startTime', {
                required: 'Обязательное поле',
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
              minH={'44px'}
              borderRadius={'18px'}
              defaultValue={'01'}
              bg={'white'}
              {...register('endTime', {
                required: 'Обязательное поле',
              })}
            >
              <option value="01">01</option>
              <option value="02">02</option>
            </Select>
            <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
          </FormControl>
        </FormTime>
        <Button
          type={'submit'}
          h={'60px'}
          bg={'linear-gradient(to right, #9FD4D8, #B1E0F9)'}
          borderRadius={'18px'}
          _hover={{
            bg: 'linear-gradient(to right, #9FD4D8, #B1E0F9)',
            opacity: 0.8,
          }}
          isLoading={washesStatus === 'loading'}
        >
          Добавить
        </Button>
      </Form>
      <Map center={[53.79462178802441, 87.15498449999993]} zoom={13}>
        <TileLayer
          attribution={
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        {markerCoord && (
          <Marker position={markerCoord} icon={MarkerIcon}>
            <Popup>
              Название: {fields?.name || '—'}
              <br />
              Город: {fields?.city || '—'}
              <br />
              Улица: {fields?.street || '—'}
              <br />
              Телефон: {fields?.phone || '—'}
              <br />
              Режим работы: {fields.startTime}:00 - {fields.endTime}:00
            </Popup>
          </Marker>
        )}
        <MapComponent setMarketCoord={setMarketCoord} />
      </Map>
    </Container>
  );
};

export default connector(CreateWash);
