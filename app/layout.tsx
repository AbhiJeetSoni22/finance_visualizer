import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Finance Visualizer',
  description: 'Track and visualize your personal finances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          <nav className="bg-gray-900 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                <Link href="/" className='text-gray-50 text-2xl'>Finance Visualizer</Link>
              </h1>
              <div className="flex gap-4">
                <Link href="/transactions" className="text-lg px-2 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
                  Transactions
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}