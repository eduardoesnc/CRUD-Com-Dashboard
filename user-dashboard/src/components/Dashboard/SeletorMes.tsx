import React from 'react';
import { useMonth } from './MonthContext';

export const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useMonth();
  

  return (
    <div className='flex items-center justify-end'>
      <h3 className="text-lg text-white mr-2">Filtre os dados selecionando um mês:</h3>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
        className="p-2 border rounded"
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
