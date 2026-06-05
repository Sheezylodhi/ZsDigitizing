import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // MongoDB connection file
import Portfolio from '@/models/Portfolio';

export async function GET() {
  await connectDB();
  const items = await Portfolio.find({});
  return NextResponse.json(items);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const newItem = await Portfolio.create(body);
  return NextResponse.json(newItem);
}