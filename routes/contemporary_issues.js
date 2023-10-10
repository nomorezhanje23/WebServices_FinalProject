const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const contemporary_issuesController = require('../controllers/contemporary_issues');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', contemporary_issuesController.getAllContemporary_issues);
// Route: GET '/'
// Function: Get a list of all contemporary issues
// Controller: 'contemporary_issuesController.getAllContemporary_issues'

router.get('/:id', contemporary_issuesController.getContemporary_issues);
// Route: GET '/:id'
// Function: Get a specific contemporary issue by its ID
// Controller: 'contemporary_issuesController.getContemporary_issues'

router.post('/', isAuthenticated, validation.saveContemporary_issues, contemporary_issuesController.createContemporary_issues);
// Route: POST '/'
// Function: Create a new contemporary issue
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveContemporary_issues' (Validation check)
// Controller: 'contemporary_issuesController.createContemporary_issues'

router.put('/:id', isAuthenticated, validation.saveContemporary_issues, contemporary_issuesController.updateContemporary_issues);
// Route: PUT '/:id'
// Function: Update an existing contemporary issue by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveContemporary_issues' (Validation check)
// Controller: 'contemporary_issuesController.updateContemporary_issues'

router.delete('/:id', isAuthenticated, contemporary_issuesController.deleteContemporary_issues);
// Route: DELETE '/:id'
// Function: Delete a specific contemporary issue by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'contemporary_issuesController.deleteContemporary_issues'

// Export the router module for use in the main application
module.exports = router;