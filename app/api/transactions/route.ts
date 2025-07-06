import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '@/lib/models/Transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  
  try {
    const transaction = await Transaction.create(data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 400 });
  }
}