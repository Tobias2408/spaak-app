import { NextApiRequest, NextApiResponse } from 'next';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from '@/swagger'; // Ensure that this import points to the correct file

// Generate the Swagger documentation specification using swagger-jsdoc
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpecs); // Return JSON response of Swagger specification
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
