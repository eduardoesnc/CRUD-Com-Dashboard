import React, { ReactNode, createContext, useContext, useState } from 'react';

interface MonthContextProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

const MonthContext = createContext<MonthContextProps | undefined>(undefined);

interface MonthProviderProps {
  children: ReactNode;
}

export const MonthProvider: React.FC<MonthProviderProps> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = () => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error('useMonth must be used within a MonthProvider');
  }
  return context;
};