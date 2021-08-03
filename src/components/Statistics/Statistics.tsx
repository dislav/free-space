import React, { useMemo } from 'react';
import useSwr from 'swr';
import { useTheme } from 'styled-components';
import { Select, Skeleton, Spinner } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

import { PaginationProps, StatProps, Wash } from '../../interfaces/types';
import { useProfile } from '../../lib/useProfile';

import {
  Container,
  Header,
  Content,
  StatisticsNumbers,
  StatisticsItem,
} from './Statistics.styled';

interface Inputs {
  wash: string;
  days: string;
  start: Date;
  end: Date;
}

const Statistics: React.FC = () => {
  const { profile } = useProfile();
  const { colors, variables } = useTheme();

  const isAdmin = localStorage.getItem('group') === '1';

  const { register, control, watch } = useForm<Inputs>();
  const fields = watch();

  const params = useMemo(() => {
    const formatStart = fields?.start
      ? dayjs(fields?.start).format('YYYY-MM-DD')
      : undefined;
    const formatEnd = fields?.end
      ? dayjs(fields?.end).format('YYYY-MM-DD')
      : undefined;

    return `?${formatStart ? `start=${formatStart}` : ''}${
      formatEnd ? `&end=${formatEnd}` : ''
    }`;
  }, [fields?.start, fields?.end]);

  const days = useMemo(() => {
    if (fields?.start || fields?.end) return 0;
    return fields?.days || 30;
  }, [fields?.days, fields?.start, fields?.end]);

  const { data: statistics, error: statisticsError } = useSwr<StatProps[]>(
    isAdmin
      ? fields?.wash
        ? `/stat/get/${fields?.wash}/${days}${params}`
        : `stat/all/${days}${params}`
      : profile?.id
      ? `/stat/get/${profile?.id}/${days}${params}`
      : null
  );
  const { data: washes, error: washesError } = useSwr<PaginationProps<Wash[]>>(
    isAdmin ? ['/wash/list', 10000] : null
  );

  const statisticsLoading = !statistics && !statisticsError;
  const washesLoading = !washes && !washesError;

  const prices = useMemo(() => {
    const pricesDone: number[] = [];
    statistics?.forEach(({ sum_done }) => {
      if (sum_done > 0) pricesDone.push(sum_done);
    });

    return pricesDone;
  }, [statistics]);

  const totalPrice = prices.reduce((sum, price) => sum + +price, 0);

  const ordersCount = useMemo(
    () => ({
      total: statistics?.reduce((sum, { orders }) => sum + +orders, 0) || 0,
      completed:
        statistics?.reduce((sum, { orders_done }) => sum + +orders_done, 0) ||
        0,
      cancel:
        statistics?.reduce(
          (sum, { orders_cancel }) => sum + +orders_cancel,
          0
        ) || 0,
    }),
    [statistics]
  );

  const statsData = (canvas: HTMLCanvasElement | null) => {
    const ctx = canvas?.getContext('2d');
    const g = ctx?.createLinearGradient(
      0,
      canvas?.height ? canvas.height - 40 : 600,
      0,
      0
    );
    g?.addColorStop(0, 'rgba(206, 237, 255, 0)');
    g?.addColorStop(1, '#E8F6FE');

    return {
      labels: statistics
        ? statistics.map(({ date }) => dayjs(date).format('DD MMM'))
        : [],
      datasets: [
        {
          label: 'Заявок',
          data: statistics ? statistics.map(({ orders }) => orders) : [],
          fill: true,
          backgroundColor: g,
          borderColor: colors.line,
          tension: 0.5,
          pointBackgroundColor: 'transparent',
          pointBorderWidth: 0,
          pointHoverBackgroundColor: colors.line,
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: 'white',
          pointRadius: 4,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  const options: ChartOptions = {
    aspectRatio: window.innerWidth / window.innerHeight,
    scales: {
      x: {
        grid: {
          drawBorder: false,
          color: () => '#F0F0F0',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          drawBorder: false,
          color: () => 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <Header>
        {isAdmin && (
          <>
            {washesLoading ? (
              <Skeleton height={'56px'} borderRadius={variables.borderRadius} />
            ) : (
              <Select
                maxW={['auto', 'auto', '180px']}
                h={'56px'}
                borderRadius={variables.borderRadius}
                placeholder={'Все мойки'}
                bg={colors.blue10}
                mr={'20px'}
                mb={['14px', '14px', '0']}
                {...register('wash')}
              >
                {washes?.list.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          </>
        )}
        <Controller
          name={'start'}
          control={control}
          defaultValue={dayjs().subtract(30, 'day').toDate()}
          render={({ field: { ref, ...props } }) => (
            <KeyboardDatePicker
              variant={'inline'}
              inputVariant={'outlined'}
              format={'DD MMM, YYYY'}
              maxDate={dayjs().toDate()}
              disableToolbar={true}
              className={'mui-picker'}
              InputProps={{
                classes: {
                  root: 'mui-picker__root',
                },
              }}
              {...props}
            />
          )}
        />
        <Controller
          name={'end'}
          control={control}
          defaultValue={dayjs().toDate()}
          render={({ field: { ref, ...props } }) => (
            <KeyboardDatePicker
              variant={'inline'}
              inputVariant={'outlined'}
              format={'DD MMM, YYYY'}
              minDate={
                fields?.start
                  ? dayjs(fields.start).toDate()
                  : dayjs().subtract(30, 'day').toDate()
              }
              maxDate={dayjs().toDate()}
              disableToolbar={true}
              className={'mui-picker'}
              InputProps={{
                classes: {
                  root: 'mui-picker__root',
                },
              }}
              {...props}
            />
          )}
        />
      </Header>
      <Content>
        {statisticsLoading ? (
          <Spinner
            size={'xl'}
            thickness={'4px'}
            speed={'0.65s'}
            color={colors.blue40}
            margin={'auto'}
          />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Line data={statsData} options={options} />
        )}
      </Content>
      <StatisticsNumbers>
        <StatisticsItem>
          <h2>Общая сумма</h2>
          <p>{totalPrice || 0} ₽</p>
        </StatisticsItem>
        <StatisticsItem>
          <h2>Средний чек</h2>
          <p>
            {totalPrice ? (totalPrice / ordersCount.completed).toFixed() : 0} ₽
          </p>
        </StatisticsItem>
        <StatisticsItem>
          <h2>Всего заявок</h2>
          <p>{ordersCount.total}</p>
        </StatisticsItem>
        <StatisticsItem>
          <h2>Завершенные заявки</h2>
          <p>{ordersCount.completed}</p>
        </StatisticsItem>
        <StatisticsItem>
          <h2>Отмененные заявки</h2>
          <p>{ordersCount.cancel}</p>
        </StatisticsItem>
      </StatisticsNumbers>
    </Container>
  );
};

export default Statistics;
