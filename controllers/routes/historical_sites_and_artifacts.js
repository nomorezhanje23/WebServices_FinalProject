const express = require('express');
const router = express.Router();

// Import controllers, validation, and authentication middleware
const historical_sites_and_artifactsController = require('../controllers/historical_sites_and_artifacts');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// Define various HTTP routes and their associated controller functions
router.get('/', historical_sites_and_artifactsController.getAllHistorical_sites_and_artifacts);
// Route: GET '/'
// Function: Get a list of all historical sites and artifacts
// Controller: 'historical_sites_and_artifactsController.getAllHistorical_sites_and_artifacts'

router.get('/:id', historical_sites_and_artifactsController.getHistorical_sites_and_artifacts);
// Route: GET '/:id'
// Function: Get a specific historical site or artifact by its ID
// Controller: 'historical_sites_and_artifactsController.getHistorical_sites_and_artifacts'

router.post('/', isAuthenticated, validation.saveHistorical_sites_and_artifacts, historical_sites_and_artifactsController.createHistorical_sites_and_artifacts);
// Route: POST '/'
// Function: Create a new historical site or artifact
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveHistorical_sites_and_artifacts' (Validation check)
// Controller: 'historical_sites_and_artifactsController.createHistorical_sites_and_artifacts'

router.put('/:id', isAuthenticated, validation.saveHistorical_sites_and_artifacts, historical_sites_and_artifactsController.updateHistorical_sites_and_artifacts);
// Route: PUT '/:id'
// Function: Update an existing historical site or artifact by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Middleware: 'validation.saveHistorical_sites_and_artifacts' (Validation check)
// Controller: 'historical_sites_and_artifactsController.updateHistorical_sites_and_artifacts'

router.delete('/:id', isAuthenticated, historical_sites_and_artifactsController.deleteHistorical_sites_and_artifacts);
// Route: DELETE '/:id'
// Function: Delete a specific historical site or artifact by its ID
// Middleware: 'isAuthenticated' (Authentication check)
// Controller: 'historical_sites_and_artifactsController.deleteHistorical_sites_and_artifacts'

// Export the router module for use in the main application
module.exports = router;
