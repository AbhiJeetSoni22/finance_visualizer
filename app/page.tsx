import { TransactionsPage } from "./TransactionsView";

  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
async function getTransactions() {
  // Use dynamic base URL (works in both dev & prod)


  const res = await fetch(`${baseUrl}/api/transactions`, {
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