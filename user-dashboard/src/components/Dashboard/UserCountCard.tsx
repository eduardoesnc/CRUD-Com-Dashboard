'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useMonth } from './MonthContext';
import { fetchData } from '@/api/functions';
import { months } from './SeletorMes';

const filterUsersByMonth = (users: any[], month: number) => {
  const startOfMonth = new Date(new Date().getFullYear(), month, 1);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  return users.filter(user => {
    const createdAt = new Date(user.createdAt);
    return createdAt >= startOfMonth && createdAt < endOfMonth;
  });
};

const UserCountCard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const { selectedMonth } = useMonth();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

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

  return (
    <Card className='h-32 flex justify-center items-center'>
      <CardContent className='text-center'>
        <Typography variant="h5" className='text-xl'>Total de Cadastros em {months[selectedMonth]}</Typography>
        <Typography variant="h4" className='my-2' >{filteredUsers.length}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCountCard;
