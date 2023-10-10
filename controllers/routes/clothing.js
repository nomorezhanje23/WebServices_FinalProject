const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const clothingController = require('../controllers/clothing');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', clothingController.getAllClothing);
// Route: GET '/'
// Function: Get a list of all clothing items
// Controller: 'clothingController.getAllClothing'

router.get('/:id', clothingController.getClothing);
// Route: GET '/:id'
// Function: Get a specific clothing item by its ID
// Controller: 'clothingController.getClothing'

router.post('/', isAuthenticated, validation.saveClothing, clothingController.createClothing);
// Route: POST '/'
// Function: Create a new clothing item
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveClothing' (Validation check)
// Controller: 'clothingController.createClothing'

router.put('/:id', isAuthenticated, validation.saveClothing, clothingController.updateClothing);
// Route: PUT '/:id'
// Function: Update an existing clothing item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveClothing' (Validation check)
// Controller: 'clothingController.updateClothing'

router.delete('/:id', isAuthenticated, clothingController.deleteClothing);
// Route: DELETE '/:id'
// Function: Delete a specific clothing item by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'clothingController.deleteClothing'

// Export the router module for use in the main application
module.exports = router;
