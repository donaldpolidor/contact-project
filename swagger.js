const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Contacts API',
    version: '1.0.0',
    description: 'A REST API for managing contacts with full CRUD operations',
    contact: {
      name: 'API Support',
      email: 'support@gmail.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://contact-project-8qvn.onrender.com',
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: 'Contacts',
      description: 'Contact management operations'
    }
  ],
  components: {
    schemas: {
      Contact: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          id: {
            type: 'string',
            description: 'Auto-generated ID of the contact'
          },
          firstName: {
            type: 'string',
            description: 'First name of the contact',
            example: 'John'
          },
          lastName: {
            type: 'string',
            description: 'Last name of the contact',
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address of the contact',
            example: 'john.doe@gmail.com'
          },
          favoriteColor: {
            type: 'string',
            description: 'Favorite color of the contact',
            example: 'Blue'
          },
          birthday: {
            type: 'string',
            format: 'date',
            description: 'Birthday in YYYY-MM-DD format',
            example: '1990-05-15'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when contact was created'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when contact was last updated'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message'
          },
          error: {
            type: 'string',
            description: 'Error details'
          }
        }
      }
    },
    responses: {
      NotFound: {
        description: 'The specified resource was not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      ValidationError: {
        description: 'Invalid input data',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      ServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    }
  }
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Swagger UI options
const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Contacts API Documentation",
  customfavIcon: '/favicon.ico'
};

module.exports = {
  swaggerSpec,
  swaggerUi,
  swaggerUiOptions
};