import { NextResponse } from 'next/server';
import { fetchLaws } from '../../../services/parliamentService';

/**
 * @swagger
 * /fetchLaws:
 *   get:
 *     summary: Fetch laws from the external Parliament API
 *     description: This endpoint fetches the latest laws data from the external Danish Parliament API.
 *     responses:
 *       200:
 *         description: A list of laws fetched from the external source.
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
    const laws = await fetchLaws();
    return NextResponse.json(laws);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch laws data', error }, { status: 500 });
  }
}
