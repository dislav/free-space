import React from 'react';
import useSwr from 'swr';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { StatProps } from '../../interfaces/types';
import { useProfile } from '../../lib/useProfile';

import { Container } from './Statistics.styled';

const Statistics: React.FC = () => {
  const { profile } = useProfile();

  const isAdmin = localStorage.getItem('group') === '1';
  const { data, error } = useSwr<StatProps[]>(
    isAdmin ? 'stat/all/30' : `/stat/get/${profile?.id}/30`
  );

  const isLoading = !data && !error;

  if (isLoading) return <></>;

  const statsData: ChartData = {
    labels: data ? data.map(({ date }) => date) : [],
    datasets: [
      {
        label: 'Заявок',
        data: data ? data.map(({ orders }) => orders) : [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.5,
        radius: 8,
      },
    ],
  };

  return (
    <Container>
      <Line data={statsData} type={''} />
    </Container>
  );
};

export default Statistics;
