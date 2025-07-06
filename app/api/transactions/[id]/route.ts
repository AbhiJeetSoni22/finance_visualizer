import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '@/lib/models/Transaction';

// Force the params type to match Next.js expectations
type NextRouteParams = { params: { id: string } } & { __tag__?: never };

export async function GET(request: Request, { params }: NextRouteParams) {
  await dbConnect();
  try {
    const transaction = await Transaction.findById(params.id);
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// Apply the same to PUT and DELETE
export async function PUT(request: Request, { params }: NextRouteParams) {
  await dbConnect();
  const data = await request.json();
  
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request, { params }: NextRouteParams) {
  await dbConnect();
  
  try {
    const transaction = await Transaction.findByIdAndDelete(params.id);
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 400 }
    );
  }
}