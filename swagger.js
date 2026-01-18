// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Complete API for contact management with CRUD operations',
      contact: {
        name: 'Donald Polidor',
        email: 'donaldpolidor@gmail.com'
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
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique contact ID'
            },
            firstName: {
              type: 'string',
              description: 'First name of the contact'
            },
            lastName: {
              type: 'string',
              description: 'Last name of the contact'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the contact'
            },
            favoriteColor: {
              type: 'string',
              description: 'Favorite color of the contact'
            },
            birthday: {
              type: 'string',
              format: 'date',
              description: 'Date of birth (YYYY-MM-DD)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date of creation'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date of last modification'
            }
          },
          example: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            favoriteColor: 'Blue',
            birthday: '1990-05-15'
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Resource not found'
        },
        ValidationError: {
          description: 'Invalid data'
        },
        ServerError: {
          description: 'Server error'
        }
      }
    },
    tags: [
      {
        name: 'Contacts',
        description: 'Operations on contacts'
      },
      {
        name: 'API Info',
        description: 'API Information'
      }
    ]
  },
  apis: ['./controllers/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: 'Contacts API Documentation',
  customCss: '.swagger-ui .topbar { display: none }',
  customfavIcon: '/favicon.ico'
};

module.exports = {
  swaggerSpec,
  swaggerUi,
  swaggerUiOptions
};