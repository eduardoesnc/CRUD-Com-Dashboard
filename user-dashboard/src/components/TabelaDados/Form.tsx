'use client';

import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    email: string;
    gender: string;
    birthDate: Dayjs | null;
}

export default function DataForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        gender: '',
        birthDate: null,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name as string]: value,
        });
    };

    const handleDateChange = (date: Dayjs | null) => {
        setFormData({
            ...formData,
            birthDate: date,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.gender) {
            formData.gender = 'não informado';
        }

        try {
            await axios.post('http://localhost:3033/users', formData);
           
            setFormData({
                name: '',
                email: '',
                gender: '',
                birthDate: null,
            });
            window.location.reload();
            
        } catch (error) {
            alert('Erro ao enviar os dados');
            console.error(error);
        }
    };

    return (
        <div className='w-full' >
            <h3 className='text-white text-xl my-3 font-bold'>Cadastrar novo usuário</h3>
            <form onSubmit={handleSubmit} className='flex items-center'>
                <TextField className='w-64 mr-3 bg-white rounded-md my-3'
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="filled"
                />
                <TextField className='w-64 mr-3 bg-white rounded-md'
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    
                    required
                    variant="filled"
                />
                <FormControl >
                    <InputLabel>Sexo</InputLabel>
                    <Select className='w-32 mr-3 bg-white rounded-md'
                        name="gender"
                        value={formData.gender}
                        onChange={handleSelectChange}
                        
                    >
                        <MenuItem value="masc">Masculino</MenuItem>
                        <MenuItem value="fem">Feminino</MenuItem>
                        <MenuItem value="outros">Outros</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className='w-64 mr-3 rounded-md bg-white'
                        label="Data de Nascimento"
                        value={formData.birthDate}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <Button type="submit" variant="contained" className='bg-[#182335] w-32 h-12'>
                    Cadastrar
                </Button>
            </form>
        </div>
    );
}
