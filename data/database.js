// Import the 'dotenv' module to load environment variables from a .env file
const dotenv = require('dotenv');

// Load environment variables from a .env file into the process.env object
dotenv.config();

// Import the 'MongoClient' class from the 'mongodb' library
const MongoClient = require('mongodb').MongoClient;

// Initialize a variable to store the database connection
let database;

// Function to initialize the database connection
const initDb = (callback) => {
    // Check if the database connection has already been established
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }
    
    // Connect to the MongoDB database using the MONGODB_URL from environment variables
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            // Store the database connection in the 'database' variable
            database = client;
            // Invoke the callback with no error and the database connection
            callback(null, database);
        })
        .catch((err) => {
            // Invoke the callback with an error if the connection fails
            callback(err);
        });
};

// Function to get the initialized database instance
const getDatabase = () => {
    // Check if the database has been initialized
    if (!database) {
        // Throw an error if the database has not been initialized
        throw Error('Database not initialized');
    }
    // Return the database instance
    return database;
};

// Export the 'initDb' and 'getDatabase' functions to make them available for use in other parts of the application
module.exports = {
    initDb,
    getDatabase
};
