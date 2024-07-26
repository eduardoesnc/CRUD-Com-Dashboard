'use client';

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { fetchData } from '@/api/functions';
import { useMonth } from './MonthContext';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const filterUsersByMonth = (users: any[], month: number) => {
  const startOfMonth = new Date(new Date().getFullYear(), month, 1);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  return users.filter(user => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= startOfMonth && createdAt < endOfMonth;
  });
};

const GenderPieChart: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { selectedMonth } = useMonth();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const allUsers = await fetchData();
      setUsers(allUsers);
    };

    fetch();
  }, []);

  useEffect(() => {
    const filtered = filterUsersByMonth(users, selectedMonth);
    setFilteredUsers(filtered);
  }, [users, selectedMonth]);

  useEffect(() => {
    const counts = filteredUsers.reduce((acc: Record<string, number>, user: any) => {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
      return acc;
    }, {});

    setData({
      labels: ['masc', 'fem', 'outros', 'não informado'],
      datasets: [
        {
          label: 'Número de Cadastros',
          data: [
            counts['masc'] || 0,
            counts['fem'] || 0,
            counts['outros'] || 0,
            counts['não informado'] || 0,
          ],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    });
  }, [filteredUsers]);

  if (!data) {
    return <div className='text-lg text-white'>Carregando gráfico...</div>;
  }

  return (
    <div className='flex flex-col text-lg text-white mt-8 h-[50vh] justify-center items-center'>
      <h3>Distribuição de Cadastros por Sexo - Gráfico de Pizza</h3>
      <Pie
        data={data}
        options={{
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'normal',
                },
                color: '#f5f5f5',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.8)',
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 12,
              },
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}`;
                },
              },
            },
          },
        }}

      />
    </div>
  );
};

export default GenderPieChart;
