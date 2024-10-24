const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next.js Backend API Documentation',
        version: '1.0.0',
        description: 'API documentation for the backend services of this Next.js project',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development server',
        },
      ],
    },
    apis: ['./app/api/**/*.ts'], // Adjust to point to the correct API files
  };
  
  export default swaggerOptions;
  