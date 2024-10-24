import { NextResponse } from 'next/server';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from '@/swagger';

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export async function GET() {
  return NextResponse.json(swaggerSpecs, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
