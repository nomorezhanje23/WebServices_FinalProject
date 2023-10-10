const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const cuisineController = require('../controllers/cuisine');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', cuisineController.getAllCuisine);
// Route: GET '/'
// Function: Get a list of all cuisine items
// Controller: 'cuisineController.getAllCuisine'

router.get('/:id', cuisineController.getCuisine);
// Route: GET '/:id'
// Function: Get a specific cuisine item by its ID
// Controller: 'cuisineController.getCuisine'

router.post('/', isAuthenticated, validation.saveCuisine, cuisineController.createCuisine);
// Route: POST '/'
// Function: Create a new cuisine item
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveCuisine' (Validation check)
// Controller: 'cuisineController.createCuisine'

router.put('/:id', isAuthenticated, validation.saveCuisine, cuisineController.updateCuisine);
// Route: PUT '/:id'
// Function: Update an existing cuisine item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveCuisine' (Validation check)
// Controller: 'cuisineController.updateCuisine'

router.delete('/:id', isAuthenticated, cuisineController.deleteCuisine);
// Route: DELETE '/:id'
// Function: Delete a specific cuisine item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'cuisineController.deleteCuisine'

// Export the router module for use in the main application
module.exports = router;
