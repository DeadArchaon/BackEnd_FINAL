import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Trailer Rating API',
      version: '1.0.0',
      description: 'API for movie trailers and ratings',
    },
    servers: [
      {
        url: 'http://localhost:6969',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const docs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
}