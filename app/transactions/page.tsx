
import { Card } from '@/components/ui/card';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionsList } from '../components/TransactionsList';
import { MonthlyChart } from '../components/MonthlyChart';

async function getTransactions() {
  // Use dynamic base URL (works in both dev & prod)
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/transactions`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return res.json();
}

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="container mx-auto py-8">
      <div className="flex  mx-3 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <TransactionForm open={false} onOpenChange={() => {}} />
      </div>

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