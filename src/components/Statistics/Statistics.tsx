import React, { useState, useMemo, useEffect } from 'react';
import useSwr from 'swr';
import { useTheme } from 'styled-components';
import { Select, Skeleton } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDebounce } from 'use-debounce';
import { KeyboardDatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

import { PaginationProps, StatProps, Wash } from '../../interfaces/types';
import { useProfile } from '../../lib/useProfile';
import { getStatistics, getStatisticsById } from '../../lib/api';

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

  const [aspectRatio, setAspectRatio] = useState(
    window.innerWidth / window.innerHeight
  );
  const [debounceAspectRatio] = useDebounce(aspectRatio, 300);

  const isAdmin = localStorage.getItem('group') === '1';

  const {
    data: statistics,
    error: statisticsError,
    mutate,
  } = useSwr<StatProps[]>(
    isAdmin ? 'stat/all/30' : profile?.id ? `/stat/get/${profile?.id}/30` : null
  );
  const { data: washes, error: washesError } = useSwr<PaginationProps<Wash[]>>(
    isAdmin ? ['/wash/list', 10000] : null
  );

  const { register, control, watch } = useForm<Inputs>();
  const fields = watch();

  const statisticsLoading = !statistics && !statisticsError;
  const washesLoading = !washes && !washesError;

  const onWindonResize = () => {
    setAspectRatio(window.innerWidth / window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', onWindonResize);

    return () => {
      window.removeEventListener('resize', onWindonResize);
    };
  }, []);

  const prices = useMemo(() => {
    const pricesDone: number[] = [];
    statistics?.forEach(({ sum_done }) => {
      if (sum_done > 0) pricesDone.push(sum_done);
    });

    return pricesDone;
  }, [statistics]);

  const averagePrice = prices.length
    ? prices.reduce((sum, price) => sum + price, 0) / prices.length
    : 0;

  const fetchStatistics = async (id?: string, start?: string, end?: string) => {
    const hasDate = start || end;
    const days = hasDate ? '0' : '30';

    if (isAdmin) {
      if (id?.length) {
        try {
          const { data } = await getStatisticsById(id, days, {
            start,
            end,
          });
          if (!data.status) throw new Error(data.message);
          mutate(data.data, false);
        } catch (e) {
          console.log(e.message);
        }
      } else {
        try {
          const { data } = await getStatistics(days, {
            start,
            end,
          });
          if (!data.status) throw new Error(data.message);
          mutate(data.data, false);
        } catch (e) {
          console.log(e.message);
        }
      }
    } else {
      if (!profile?.id) return;
      try {
        const { data } = await getStatisticsById(profile.id, days, {
          start,
          end,
        });
        if (!data.status) throw new Error(data.message);
        mutate(data.data, false);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useMemo(() => {
    if (!Object.keys(fields)?.length) return;

    const formatStart = fields?.start
      ? dayjs(fields?.start).format('YYYY-MM-DD')
      : undefined;
    const formatEnd = fields?.end
      ? dayjs(fields?.end).format('YYYY-MM-DD')
      : undefined;

    fetchStatistics(fields?.wash, formatStart, formatEnd);
  }, [fields?.wash, fields?.start, fields?.end]);

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
          radius: 8,
        },
      ],
    };
  };

  const options: ChartOptions = {
    aspectRatio: debounceAspectRatio,
    scales: {
      x: {
        grid: {
          drawBorder: false,
          color: () => '#F0F0F0',
        },
      },
      y: {
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

  if (statisticsLoading) return <></>;

  return (
    <Container>
      <Header>
        {isAdmin && (
          <>
            {washesLoading ? (
              <Skeleton
                height={['32px', '32px', '44px']}
                borderRadius={variables.borderRadius}
              />
            ) : (
              <Select
                maxW={'180px'}
                h={['32px', '32px', '44px']}
                borderRadius={variables.borderRadius}
                placeholder={'Все мойки'}
                bg={colors.blue10}
                mr={'20px'}
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
        <Line data={statsData} options={options} type={'line'} />
      </Content>
      <StatisticsNumbers>
        <StatisticsItem>
          <h2>Средний чек</h2>
          <p>{averagePrice} ₽</p>
        </StatisticsItem>
      </StatisticsNumbers>
    </Container>
  );
};

export default Statistics;
