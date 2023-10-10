const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const culturalController = require('../controllers/cultural');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', culturalController.getAllCultural);
// Route: GET '/'
// Function: Get a list of all cultural items
// Controller: 'culturalController.getAllCultural'

router.get('/:id', culturalController.getCultural);
// Route: GET '/:id'
// Function: Get a specific cultural item by its ID
// Controller: 'culturalController.getCultural'

router.post('/', isAuthenticated, validation.saveCultural, culturalController.createCultural);
// Route: POST '/'
// Function: Create a new cultural item
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveCultural' (Validation check)
// Controller: 'culturalController.createCultural'

router.put('/:id', isAuthenticated, validation.saveCultural, culturalController.updateCultural);
// Route: PUT '/:id'
// Function: Update an existing cultural item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveCultural' (Validation check)
// Controller: 'culturalController.updateCultural'

router.delete('/:id', isAuthenticated, culturalController.deleteCultural);
// Route: DELETE '/:id'
// Function: Delete a specific cultural item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'culturalController.deleteCultural'

// Export the router module for use in the main application
module.exports = router;
