import { GridRowId, GridRowModel } from '@mui/x-data-grid';
import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3033/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function UpdateUser(id: GridRowId, dataToUpdate: GridRowModel) {
  try {
    const response = await axios.put(`http://localhost:3033/users/${id}`, dataToUpdate);
    return response.data;
  } catch (error) {
    throw new Error('Failed to Update');
  }
}

export async function DeleteUser(id: GridRowId) {
  try {
    const response = await axios.delete(`http://localhost:3033/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to Delete');
  }
}