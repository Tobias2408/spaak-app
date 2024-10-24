import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

/**
 * @swagger
 * /getLaws:
 *   get:
 *     summary: Retrieve all laws from the database
 *     description: This endpoint fetches all the laws from the PostgreSQL database.
 *     responses:
 *       200:
 *         description: A list of laws
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sagId:
 *                     type: number
 *                   title:
 *                     type: string
 *                   statusId:
 *                     type: number
 *                   description:
 *                     type: string
 *                   proposerName:
 *                     type: string
 */
export async function GET() {
  try {
    const laws = await prisma.law.findMany();
    return NextResponse.json(laws);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to retrieve laws', error }, { status: 500 });
  }
}
