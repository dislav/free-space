import React, { useState, useMemo, useEffect, useRef } from 'react';
import useSwr from 'swr';
import { useTheme } from 'styled-components';
import { Select, Skeleton } from '@chakra-ui/react';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDebounce } from 'use-debounce';
import dayjs from 'dayjs';

import { StatProps, Wash } from '../../interfaces/types';
import { useProfile } from '../../lib/useProfile';
import { getStatistics, getStatisticsById } from '../../lib/api';

import {
  Container,
  Header,
  Content,
  StatisticsNumbers,
  StatisticsItem,
} from './Statistics.styled';

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
    isAdmin ? 'stat/all/30' : `/stat/get/${profile?.id}/30`
  );
  const { data: washes, error: washesError } = useSwr<Wash[]>(
    isAdmin ? '/wash/list' : null
  );

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

  const onChangeWash = async (id: string) => {
    if (id.length) {
      try {
        const { data } = await getStatisticsById(id);
        if (!data.status) throw new Error(data.message);
        mutate(data.data, false);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      try {
        const { data } = await getStatistics();
        if (!data.status) throw new Error(data.message);
        mutate(data.data, false);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

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
                onChange={({ target }) => onChangeWash(target.value)}
              >
                {washes?.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          </>
        )}
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
