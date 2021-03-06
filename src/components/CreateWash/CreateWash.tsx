import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useSwr, { mutate } from 'swr';
import {
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  Select,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import MediaQuery from 'react-responsive';
import L, { DivIcon, LatLng, LatLngTuple } from 'leaflet';
import { TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useDebounce } from 'use-debounce';

import ReactSelect from 'react-select';

import { City, Wash } from '../../interfaces/types';
import { createWash, getGeoCodeByAddress, updateWash } from '../../lib/api';

import {
  Container,
  Form,
  FormSelect,
  FormTime,
  Map,
} from './CreateWash.styled';

interface Inputs {
  name: string;
  city: string;
  street: string;
  phone: string;
  startTime: string;
  endTime: string;
}

const MarkerIcon = new DivIcon({
  iconSize: [30, 36],
  html: `<svg width="31" height="37" viewBox="0 0 31 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2544 35.4986C4.57954 26.8751 -10.7002 9.21091 14.8358 0.656982C41.2089 7.33321 26.3479 26.8751 15.2544 35.4986Z" fill="url(#paint0_linear)"/>
    <path d="M25.9984 4.46063C23.122 1.58414 19.2974 0 15.2295 0C11.1616 0 7.33704 1.58414 4.46063 4.46063C1.58414 7.33718 0 11.1616 0 15.2295C0 23.4587 7.78095 30.3034 11.9612 33.9805C12.5421 34.4915 13.0437 34.9328 13.4434 35.3061C13.9441 35.7739 14.5869 36.0078 15.2295 36.0078C15.8722 36.0078 16.5148 35.7739 17.0156 35.3061C17.4153 34.9328 17.9169 34.4915 18.4978 33.9805C22.678 30.3033 30.459 23.4587 30.459 15.2295C30.4589 11.1616 28.8749 7.33718 25.9984 4.46063ZM17.1046 32.3969C16.511 32.9191 15.9984 33.3701 15.5757 33.7648C15.3815 33.9461 15.0774 33.9461 14.8832 33.7648C14.4606 33.3699 13.9479 32.919 13.3542 32.3968C9.42431 28.9398 2.10914 22.5049 2.10914 15.2295C2.10914 7.99503 7.99482 2.10935 15.2294 2.10935C22.4639 2.10935 28.3496 7.99503 28.3496 15.2295C28.3497 22.5049 21.0345 28.9398 17.1046 32.3969Z" fill="url(#paint1_linear)"/>
    <path d="M15.5264 6C10.3027 6 6.05273 10.25 6.05273 15.4737C6.05273 20.6974 10.3027 24.9474 15.5264 24.9474C20.7501 24.9474 25.0001 20.6974 25.0001 15.4737C25.0001 10.25 20.7501 6 15.5264 6ZM20.3731 9.53875C20.4796 9.42023 20.6299 9.35024 20.7895 9.34391C20.9271 9.32831 21.104 9.39537 21.2197 9.50522C22.4478 10.668 23.2828 12.1483 23.632 13.7859C23.6875 14.0472 23.5615 14.3132 23.3244 14.4358C22.745 14.7353 22.0569 14.8804 21.3977 14.8804C20.5385 14.8804 19.7243 14.634 19.2525 14.1622C18.2487 13.159 18.6673 11.4307 20.3731 9.53875ZM10.6798 21.5011C10.5733 21.6196 10.423 21.6902 10.2634 21.6966C10.2565 21.6971 10.2484 21.6971 10.2403 21.6971C10.0888 21.6971 9.94308 21.6393 9.83323 21.5352C8.60507 20.3724 7.7701 18.8921 7.42088 17.254C7.36537 16.9927 7.49144 16.7267 7.72852 16.6041C9.06308 15.9154 10.9666 16.0438 11.8004 16.8776C12.803 17.8809 12.3843 19.6092 10.6798 21.5011ZM11.8003 14.1623C11.3285 14.6341 10.5143 14.8805 9.6551 14.8805C8.99592 14.8805 8.30898 14.7353 7.72846 14.4358C7.49138 14.3133 7.36532 14.0472 7.42083 13.7859C7.7701 12.1484 8.60502 10.6681 9.83317 9.50528C9.9488 9.39542 10.1188 9.3272 10.2634 9.34396C10.423 9.35035 10.5733 9.42029 10.6797 9.5388C12.3855 11.4307 12.8041 13.159 11.8003 14.1623ZM18.0498 23.3694C17.2298 23.6307 16.381 23.7632 15.5264 23.7632C14.6718 23.7632 13.8229 23.6308 13.0031 23.3694C12.7428 23.2861 12.5729 23.0363 12.5913 22.764C12.7394 20.6332 14.0011 19.0263 15.5264 19.0263C17.0518 19.0263 18.3135 20.6332 18.4615 22.7639C18.48 23.0363 18.31 23.2861 18.0498 23.3694ZM13.158 15.4737C13.158 14.1675 14.2208 13.1052 15.5264 13.1052C16.8321 13.1052 17.8949 14.1674 17.8949 15.4737C17.8949 16.7799 16.8321 17.8421 15.5264 17.8421C14.2208 17.8421 13.158 16.7799 13.158 15.4737ZM18.4615 8.23022C18.3135 10.3604 17.0518 11.9673 15.5264 11.9673C14.0011 11.9673 12.7394 10.3604 12.5913 8.23022C12.5729 7.95789 12.7417 7.70809 13.0019 7.62538C14.6418 7.10148 16.4111 7.10148 18.0509 7.62538C18.3112 7.70809 18.48 7.95789 18.4615 8.23022ZM23.632 17.1598C23.2827 18.7979 22.4478 20.2782 21.2197 21.441C21.1098 21.5451 20.9641 21.6029 20.8126 21.6029C20.8045 21.6029 20.7964 21.6029 20.7895 21.6024C20.6299 21.596 20.4796 21.526 20.3731 21.4075C18.6674 19.5156 18.2487 17.7867 19.2525 16.7834C20.0863 15.9491 21.9887 15.8224 23.3244 16.5099C23.5615 16.6325 23.6875 16.8985 23.632 17.1598Z" fill="url(#paint2_linear)"/>
    <defs>
    <linearGradient id="paint0_linear" x1="13.4802" y1="-38.4684" x2="37.6095" y2="63.0402" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"/>
      <stop offset="1" stop-color="white"/>
    </linearGradient>
    <linearGradient id="paint1_linear" x1="13.3734" y1="-40.435" x2="37.7287" y2="64.7602" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B6FAFF"/>
      <stop offset="0.416667" stop-color="#6AD7FF"/>
      <stop offset="1" stop-color="#5090FF"/>
    </linearGradient>
    <linearGradient id="paint2_linear" x1="14.3718" y1="-15.277" x2="25.3719" y2="40.8897" gradientUnits="userSpaceOnUse">
      <stop stop-color="#B6FAFF"/>
      <stop offset="0.416667" stop-color="#6AD7FF"/>
      <stop offset="1" stop-color="#5090FF"/>
    </linearGradient>
    </defs>
  </svg>`,
});

const MapComponent: React.FC<{
  setMarketCoord: (latlng: LatLng) => void;
  onGetAddress?: (address: string) => void;
  center?: LatLngTuple;
}> = ({ setMarketCoord, onGetAddress, center }) => {
  const map = useMap();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const geocoder = L.Control.Geocoder.nominatim();

  useMapEvent('click', ({ latlng }) => {
    setMarketCoord(latlng);
    geocoder.reverse(
      latlng,
      map.options.crs?.scale(map.getZoom()),
      (results: any[]) => {
        if (results[0]) onGetAddress?.(results[0].name);
      }
    );
  });

  useEffect(() => {
    if (center) {
      const [lat, lng] = center;
      map.panTo(new LatLng(lat, lng));
    }
  }, [center]);

  return null;
};

const TimeOptions = () => (
  <>
    {[...Array(24).keys()].map((key) => (
      <option key={key} value={key}>
        {key < 10 ? `0${key}` : key}
      </option>
    ))}
  </>
);

const CreateWash: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const { data: cities, error: citiesError } = useSwr<City[]>('/guide/cites');
  const {
    data: washInfo,
    error: washError,
    isValidating,
  } = useSwr<Wash>(id ? `/wash/info/${id}` : null);

  const citiesLoading = !cities && !citiesError;
  const washInfoLoading = !washInfo && !washError;

  const sortedCities = useMemo(
    () =>
      cities
        ?.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .map(({ name }) => ({ value: name, label: name })),
    [cities]
  );

  const workTime = washInfo?.worktime.length
    ? washInfo?.worktime.split('-')
    : undefined;
  const startTime = workTime?.[0]?.split(':')?.[0];
  const endTime = workTime?.[1]?.split(':')?.[0];

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<Inputs>();

  const history = useHistory();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [center, setCenter] = useState<LatLngTuple>([55.7540471, 37.62045]);
  const [markerCoord, setMarketCoord] = useState<LatLng>();

  const { colors, variables, breakpoints } = useTheme();
  const fields = watch();

  const [debounceStreet] = useDebounce(fields?.street, 800);

  const phoneFormat = (value: string) => {
    const phone = value.replace(/[^\d]/g, '');
    if (/^\d{11}$/.test(phone))
      return `${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(
        4,
        7
      )} ${phone.slice(7, 11)}`;
    return phone;
  };

  const onCopyData = (data: string) => {
    navigator?.clipboard.writeText(data);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();

    const { startTime, endTime, ...props } = data;
    const newData = {
      ...props,
      lat: markerCoord?.lat,
      lon: markerCoord?.lng,
      worktime: `${startTime}:00-${endTime}:00`,
    };

    Object.entries(newData).forEach(([key, value]) => {
      if (value) formData.append(key, value.toString());
    });

    if (id) {
      try {
        const response = await updateWash(id, formData);
        if (!response.data.status) throw new Error(response.data.message);

        toast({
          title: '??????????????',
          position: 'top-right',
          description: `?????????? ??${data.name}?? ?????????????? ??????????????????.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        history.push('/');
      } catch (e) {
        toast({
          title: '????????????',
          position: 'top-right',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        mutate('/wash/list');
        setIsLoading(false);
      }
    } else {
      try {
        const response = await createWash(formData);
        if (!response.data.status) throw new Error(response.data.message);

        const loginAndPassword = `??????????: ${response.data.data.nick}\n????????????: ${response.data.data.pass}`;

        toast({
          title: '??????????????',
          position: 'top-right',
          description: (
            <span>
              ?????????? ??{data.name}?? ?????????????? ??????????????.
              <br />
              <br />
              ??????????: {response.data.data.nick}
              <br />
              ????????????: {response.data.data.pass}
              <br />
              <br />
              <Button
                color={colors.white}
                colorScheme={'blackAlpha'}
                onClick={() => onCopyData(loginAndPassword)}
              >
                ??????????????????????
              </Button>
            </span>
          ),
          status: 'success',
          duration: 200000,
          isClosable: true,
        });

        history.push('/');
      } catch (e) {
        toast({
          title: '????????????',
          position: 'top-right',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getGeoCodeRequest = async (address: string) => {
    try {
      const { data } = await getGeoCodeByAddress(address);
      setCenter([+data.data.geo_lat || 0, +data.data.geo_lon || 0]);
      setMarketCoord(new LatLng(+data.data.geo_lat, +data.data.geo_lon));
    } catch (e) {
      toast({
        title: '????????????',
        position: 'top-right',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // useMemo(() => {
  //   if (!debounceStreet?.length) return;
  //   getGeoCodeRequest(
  //     `${fields?.city ? `${fields.city}, ` : ''}${debounceStreet}`
  //   );
  // }, [fields?.city, debounceStreet]);

  useMemo(() => {
    getGeoCodeRequest(fields?.city || '');
  }, [fields?.city]);

  const onGetAddress = (address: string) => {
    setValue('street', address);
  };

  if (id && (washInfoLoading || isValidating)) return <></>;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <Input
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'???????????????? ??????????????'}
            defaultValue={washInfo?.name || ''}
            bg={colors.white}
            {...register('name', {
              required: '???????????????????????? ????????',
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        {!citiesLoading ? (
          <FormSelect error={!!errors.city}>
            <Controller
              name={'city'}
              control={control}
              defaultValue={washInfo?.city || ''}
              rules={{
                required: '???????????????????????? ????????',
              }}
              render={({ field: { value, onChange, ...props } }) => (
                <ReactSelect
                  className={'react-select'}
                  classNamePrefix={'react-select'}
                  placeholder={'???????????????? ??????????'}
                  noOptionsMessage={() => '???????????? ????????'}
                  defaultValue={
                    washInfo?.city
                      ? { value: washInfo.city, label: washInfo.city }
                      : null
                  }
                  options={sortedCities}
                  onChange={(option) => {
                    console.log(option);
                    getGeoCodeRequest(option?.value || '????????????');
                    onChange(option?.value);
                  }}
                  isClearable={true}
                  {...props}
                />
              )}
            />
            {errors.city && <p>{errors.city?.message}</p>}
          </FormSelect>
        ) : (
          <Skeleton
            h={['32px', '32px', '44px']}
            mb={'20px'}
            borderRadius={variables.borderRadius}
          />
        )}
        <FormControl isInvalid={!!errors.street} mb={'20px'}>
          <Input
            minH={'44px'}
            borderRadius={'18px'}
            placeholder={'??????????'}
            defaultValue={washInfo?.street || ''}
            bg={colors.white}
            {...register('street', {
              required: '???????????????????????? ????????',
            })}
          />
          <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone} mb={'30px'}>
          <Controller
            name={'phone'}
            control={control}
            defaultValue={washInfo?.phone ? phoneFormat(washInfo.phone) : ''}
            rules={{
              required: '???????????????????????? ????????',
            }}
            render={({ field: { onChange, ...field } }) => (
              <Input
                minH={'44px'}
                borderRadius={'18px'}
                placeholder={'??????????????'}
                bg={'white'}
                maxLength={16}
                onChange={({ target }) => onChange(phoneFormat(target.value))}
                {...field}
              />
            )}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <FormTime>
          <p>?????????? ???????????? (???????????? - ?????????????????? ???????????????? ??????)</p>
          <FormControl isInvalid={!!errors.startTime} w={'30%'}>
            <Select
              minH={'44px'}
              borderRadius={'18px'}
              defaultValue={startTime || '8'}
              bg={'white'}
              {...register('startTime', {
                required: '???????????????????????? ????????',
              })}
            >
              <TimeOptions />
            </Select>
            <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
          </FormControl>
          <span>???</span>
          <FormControl isInvalid={!!errors.endTime} w={'30%'}>
            <Select
              minH={'44px'}
              borderRadius={'18px'}
              defaultValue={endTime || '18'}
              bg={'white'}
              {...register('endTime', {
                required: '???????????????????????? ????????',
              })}
            >
              <TimeOptions />
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
          isLoading={isLoading}
        >
          {id ? '??????????????????' : '????????????????'}
        </Button>
      </Form>
      <MediaQuery minWidth={breakpoints.xl}>
        <Map center={center} zoom={13}>
          <TileLayer
            attribution={
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
            url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
          />
          {markerCoord && (
            <Marker position={markerCoord} icon={MarkerIcon}>
              <Popup>
                ????????????????: {fields?.name || '???'}
                <br />
                ??????????: {fields?.city || '???'}
                <br />
                ??????????: {fields?.street || '???'}
                <br />
                ??????????????: {fields?.phone || '???'}
                <br />
                ?????????? ????????????: {fields.startTime}:00 - {fields.endTime}:00
              </Popup>
            </Marker>
          )}
          <MapComponent
            setMarketCoord={setMarketCoord}
            onGetAddress={onGetAddress}
            center={center}
          />
        </Map>
      </MediaQuery>
    </Container>
  );
};

export default CreateWash;
