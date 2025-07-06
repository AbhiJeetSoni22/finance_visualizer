'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Transaction {
  amount: number;
  date: string;
  type: 'expense' | 'income';
}

interface MonthlyChartProps {
  transactions: Transaction[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const monthlyData = useMemo(() => {
    const months: Record<string, { name: string; expenses: number }> = {};

    // Initialize all months with 0 expenses
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    monthNames.forEach((month, index) => {
      months[index] = { name: month, expenses: 0 };
    });

    // Calculate expenses for each month
    transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        const date = new Date(transaction.date);
        const month = date.getMonth();
        months[month].expenses += Math.abs(transaction.amount);
      }
    });

    return Object.values(months);
  }, [transactions]);

  return (
    <div className="h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Expenses']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="expenses" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}