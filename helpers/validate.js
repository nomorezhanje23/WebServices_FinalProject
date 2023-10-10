const Validator = require('validatorjs');

// Define a custom validator function that uses the Validator class
const validator = (body, rules, customMessages, callback) => {
    // Create a new instance of the Validator class with the provided parameters
    const validation = new Validator(body, rules, customMessages);

    // Check if the validation passes
    validation.passes(() => {
        // If validation passes, invoke the callback with no error and a 'true' status
        callback(null, true);
    });

    // Check if the validation fails
    validation.fails(() => {
        // If validation fails, invoke the callback with validation errors and a 'false' status
        callback(validation.errors, false);
    });
};

// Export the validator function to make it available for use in other parts of the application
module.exports = validator;
