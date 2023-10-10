const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Serve Swagger UI at the '/api-docs' route
router.use('/api-docs', swaggerUi.serve);
// Route: Any route starting with '/api-docs'
// Function: Serve Swagger UI for API documentation

// Setup Swagger UI using the provided Swagger document
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
// Route: GET '/api-docs'
// Function: Setup Swagger UI with the provided Swagger document

// Export the router module for use in the main application
module.exports = router;
