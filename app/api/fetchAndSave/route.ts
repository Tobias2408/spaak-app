import { NextResponse } from 'next/server';
import { fetchAndSaveLaws } from '../../../services/parliamentService';

/**
 * @swagger
 * /fetchAndSave:
 *   get:
 *     summary: Fetch and save laws from external Parliament API
 *     description: This endpoint fetches law data from the external Parliament service and saves it to the database.
 *     responses:
 *       200:
 *         description: Successfully fetched and saved laws data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       500:
 *         description: Failed to fetch and save laws data from the external Parliament service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating why the request failed.
 *                 error:
 *                   type: string
 *                   description: Error details.
 */
export async function GET() {
  try {
    await fetchAndSaveLaws();
    return NextResponse.json({ message: 'Laws fetched and saved successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch and save laws', error: error.message }, { status: 500 });
  }
}
