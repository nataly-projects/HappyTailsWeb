const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Happy Tails Title',
      version: '1.0.0',
      description: 'A sample API for learning Swagger'
    },
     servers: [
       {
         api: 'http://localhost:5001/',
       },
     ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDefinition = swaggerJsdoc(options);

module.exports = swaggerDefinition;

  