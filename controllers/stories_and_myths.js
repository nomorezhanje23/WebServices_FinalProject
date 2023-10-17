const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

// Define a function to retrieve all story or myth documents
const getAllStories_and_myths = async (req, res) => {
    // Define a Swagger tag for API documentation
    //#swagger.tags=['stories_and_myths']
    
    // Use 'await' to asynchronously retrieve data from the MongoDB database
    const result = await mongodb
        .getDatabase() // Get the initialized MongoDB database instance
        .db() // Access the MongoDB database
        .collection('stories_and_myths') // Access the 'stories_and_myths' collection in the database
        .find() // Perform a 'find' operation to retrieve all documents in the collection
        .toArray((err, lists) => { // Convert the results to an array
            if (err) {
                // Handle any errors that occur during the database operation
                res.status(400).json({ message: err }); // Respond with a 400 status and error message
            }
        })
        .then((stories_and_myths) => { // Once the data is retrieved successfully
            // Set the response header to indicate JSON content
            res.setHeader('Content-Type', 'application/json');
            // Respond with a 200 status and the retrieved 'stories_and_myths' data in JSON format
            res.status(200).json(stories_and_myths);
        });
};

// Define a function to retrieve a specific story or myth document by ID
const getStories_and_myths = async (req, res) => {
    // Define a Swagger tag for API documentation
    //#swagger.tags=['stories_and_myths']

    // Check if the provided 'id' parameter is a valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid stories_and_myths id to find a stories_and_myths');
        return; // Exit the function if the 'id' is invalid
    }

    // Convert the 'id' parameter to a valid ObjectId
    const userId = new ObjectId(req.params.id);

    try {
        // Use 'await' to asynchronously retrieve data from the MongoDB database
        const result = await mongodb
            .getDatabase() // Get the initialized MongoDB database instance
            .db() // Access the MongoDB database
            .collection('stories_and_myths') // Access the 'stories_and_myths' collection in the database
            .find({_id: userId }) // Perform a 'find' operation to retrieve a specific document by '_id'
            .toArray((err, lists) => { // Convert the result to an array
                if (err) {
                    // Handle any errors that occur during the database operation
                    res.status(400).json({ message: err }); // Respond with a 400 status and error message
                }
            })
            .then((stories_and_myths) => { // Once the data is retrieved successfully
                // Set the response header to indicate JSON content
                res.setHeader('Content-Type', 'application/json');
                // Respond with a 200 status and the retrieved 'stories_and_myths' data (first element) in JSON format
                res.status(200).json(stories_and_myths[0]);
            });
    } catch (err) {
        // Handle any errors that occur during the try-catch block
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};

// Define a function to create a new story or myth document
const createStories_and_myths = async (req, res) => {
    // Define a Swagger tag for API documentation
    //#swagger.tags=['stories_and_myths']

    // Create a 'stories_and_myths' object from request body data
    const stories_and_myths = {
        title: req.body.title,
        origin: req.body.origin,
        synopsis: req.body.synopsis,
        moral_teachings: req.body.moral_teachings,
        characters: req.body.characters,
        variations: req.body.variations,
        source: req.body.source
    }

    // Use 'await' to asynchronously insert the 'stories_and_myths' document into the MongoDB collection
    const response = await mongodb.getDatabase().db().collection('stories_and_myths').insertOne(stories_and_myths);

    if (response.acknowledged) {
        // If the insertion is acknowledged, respond with a 204 status (no content)
        res.status(204).send();
    } else {
        // If there is an error or the insertion is not acknowledged, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while updating the stories_and_myths.');
    }
};

// Define a function to update a story or myth document
const updateStories_and_myths = async (req, res) => {
    // Define a Swagger tag for API documentation
    //#swagger.tags=['stories_and_myths']

    // Check if the provided ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid stories_and_myths id to update a stories_and_myths')
    }
    
    // Create an ObjectId from the request parameter ID
    const stories_and_mythsId = new ObjectId(req.params.id);

    // Create a 'stories_and_myths' object from the request body data
    const stories_and_myths = {
        title: req.body.title,
        origin: req.body.origin,
        synopsis: req.body.synopsis,
        moral_teachings: req.body.moral_teachings,
        characters: req.body.characters,
        variations: req.body.variations,
        source: req.body.source
    }

    // Use 'await' to asynchronously replace the existing document with the updated 'stories_and_myths' object
    const response = await mongodb.getDatabase().db().collection('stories_and_myths').replaceOne({ _id: stories_and_mythsId }, stories_and_myths);

    // Check if any documents were modified during the update
    if (response.modifiedCount > 0) {
        // If modified, respond with a 204 status (no content) indicating success
        res.status(204).send();
    } else {
        // If no documents were modified or an error occurred, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while updating the stories_and_myths.');
        console.error('MongoDB Error:', response.err);
    }
};

// Define a function to delete a story or myth document
const deleteStories_and_myths = async (req, res) => {
    // Define a Swagger tag for API documentation
    //#swagger.tags=['stories_and_myths']

    // Check if the provided ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid stories_and_myths id to delete a stories_and_myths')
    }

    // Create an ObjectId from the request parameter ID
    const stories_and_mythsId = new ObjectId(req.params.id);

    // Use 'await' to asynchronously delete the document with the specified '_id'
    const response = await mongodb.getDatabase().db().collection('stories_and_myths').deleteOne({ _id: stories_and_mythsId });

    // Check if any documents were deleted during the operation
    if (response.deletedCount > 0) {
        // If deleted, respond with a 204 status (no content) indicating success
        res.status(204).send();
    } else {
        // If no documents were deleted or an error occurred, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while deleting the stories_and_myths.');
    }
};

// Export the CRUD functions for stories and myths
module.exports = {
    getAllStories_and_myths,
    getStories_and_myths,
    createStories_and_myths,
    updateStories_and_myths,
    deleteStories_and_myths
};
