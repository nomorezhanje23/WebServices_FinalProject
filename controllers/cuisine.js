const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all cuisine entries
const getAllCuisine = async (req, res) => {
    //#swagger.tags=['cuisine']
    // Retrieve all cuisine entries from the database
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('cuisine')
        .find()
        .toArray((err, lists) => {
            if (err) {
                // Handle error and return a 400 Bad Request response with the error message
                res.status(400).json({ message: err });
            }
        })
        .then((cuisine) => {
            // Set the response header and return a 200 OK response with the cuisine data
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(cuisine);
        });
};

// Function to retrieve a specific cuisine entry by ID
const getCuisine = async (req, res) => {
    //#swagger.tags=['cuisine']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid cuisine id to find a cuisine');
    }
    // Convert the request parameter to a valid ObjectId
    const userId = new ObjectId(req.params.id);
    
    try {
        // Retrieve the cuisine entry with the specified ID from the database
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('cuisine')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    // Handle error and return a 400 Bad Request response with the error message
                    res.status(400).json({ message: err });
                }
            })
            .then((cuisine) => {
                // Set the response header and return a 200 OK response with the cuisine data
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(cuisine[0]);
            });
    } catch (err) {
        // Handle any other errors and return a 500 Internal Server Error response
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};
const createCuisine = async (req, res) => {
    //#swagger.tags=['cuisine']
    // Create a cuisine object using request body data
    const cuisine = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        cultural_significance: req.body.cultural_significance,
        serving_and_presentation: req.body.serving_and_presentation,
        taste_profile: req.body.taste_profile,
        variations: req.body.variations
    }
    // Insert the cuisine object into the database
    const response = await mongodb.getDatabase().db().collection('cuisine').insertOne(cuisine);
    if (response.acknowledged) {
        // If insertion is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the cuisine.');
    }
};

const updateCuisine = async (req, res) => {
    //#swagger.tags=['cuisine']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid cuisine id to update a cuisine')
    }
    // Convert the request parameter to a valid ObjectId
    const cuisineId = new ObjectId(req.params.id);
    // Create a cuisine object using request body data
    const cuisine = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        preparation: req.body.preparation,
        cultural_significance: req.body.cultural_significance,
        serving_and_presentation: req.body.serving_and_presentation,
        taste_profile: req.body.taste_profile,
        variations: req.body.variations
    }
    // Replace the existing cuisine entry with the specified ID in the database
    const response = await mongodb.getDatabase().db().collection('cuisine').replaceOne({ _id: cuisineId }, cuisine);
    if (response.modifiedCount > 0) {
        // If the update is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no modification occurred, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the cuisine.');
        console.error('MongoDB Error:', response.err);
    }
};

const deleteCuisine = async (req, res) => {
    //#swagger.tags=['cuisine']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid cuisines id to delete a cuisine')
    }
    // Convert the request parameter to a valid ObjectId
    const cuisineId = new ObjectId(req.params.id);
    // Delete the cuisine entry with the specified ID from the database
    const response = await mongodb.getDatabase().db().collection('cuisines').deleteOne({ _id: cuisineId });
    if (response.deletedCount > 0) {
        // If deletion is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no deletion occurred, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while deleting the cuisine.');
    }
};

// Exporting the cuisine CRUD functions for use in other modules
module.exports = {
    getAllCuisine,
    getCuisine,
    createCuisine,
    updateCuisine,
    deleteCuisine
}