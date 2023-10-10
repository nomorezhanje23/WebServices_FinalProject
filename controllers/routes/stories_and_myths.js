const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const stories_and_mythsController = require('../controllers/stories_and_myths');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', stories_and_mythsController.getAllStories_and_myths);
// Route: GET '/'
// Function: Get a list of all stories and myths
// Controller: 'stories_and_mythsController.getAllStories_and_myths'

router.get('/:id', stories_and_mythsController.getStories_and_myths);
// Route: GET '/:id'
// Function: Get a specific story or myth by its ID
// Controller: 'stories_and_mythsController.getStories_and_myths'

router.post('/', isAuthenticated, validation.saveStories_and_myths, stories_and_mythsController.createStories_and_myths);
// Route: POST '/'
// Function: Create a new story or myth
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveStories_and_myths' (Validation check)
// Controller: 'stories_and_mythsController.createStories_and_myths'

router.put('/:id', isAuthenticated, validation.saveStories_and_myths, stories_and_mythsController.updateStories_and_myths);
// Route: PUT '/:id'
// Function: Update an existing story or myth by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveStories_and_myths' (Validation check)
// Controller: 'stories_and_mythsController.updateStories_and_myths'

router.delete('/:id', isAuthenticated, stories_and_mythsController.deleteStories_and_myths);
// Route: DELETE '/:id'
// Function: Delete a specific story or myth by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'stories_and_mythsController.deleteStories_and_myths'

// Export the router module for use in the main application
module.exports = router;
