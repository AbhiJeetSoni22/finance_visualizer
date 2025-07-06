'use client';

import { TransactionForm } from './components/TransactionForm';
import { TransactionsList } from './components/TransactionsList';
import { MonthlyChart } from './components/MonthlyChart';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define a proper type for your transactions
interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'expense' | 'income';
}

interface TransactionsPageProps {
  transactions: Transaction[];
}

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex mx-3 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add Transaction</Button>
      </div>

      <TransactionForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionsList transactions={transactions} />
        </Card>
        <Card className="p-6">
          <MonthlyChart transactions={transactions} />
        </Card>
      </div>
    </div>
  );
}