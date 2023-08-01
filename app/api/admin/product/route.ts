import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export default function POST(
  request: Request
) {
  console.log('request', request);
}