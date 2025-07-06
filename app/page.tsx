import { TransactionsPage } from "./TransactionsView";


async function getTransactions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return res.json();
}

export default async function Home() {
  const transactions = await getTransactions();
  
  return (
    <main>
      <TransactionsPage transactions={transactions} />
    </main>
  );
}