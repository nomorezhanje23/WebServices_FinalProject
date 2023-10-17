const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

const getAllClothing = async (req, res) => {
    //#swagger.tags=['clothing']
    // Retrieve all clothing items from the 'clothing' collection in the database
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('clothing')
        .find()
        .toArray((err, lists) => {
            if (err) {
                // If there's an error, return a 400 Bad Request response with the error message
                res.status(400).json({ message: err });
            }
        })
        .then((clothing) => {
        // Set the response headers and send a 200 OK response with the retrieved clothing items
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clothing);
    });
};

const getClothing = async (req, res) => {
     //#swagger.tags=['clothing']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid clothing id to find a clothing')
    }
    // Convert the request parameter to a valid ObjectId
    const userId = new ObjectId(req.params.id);
    
    try {
        // Find the clothing item with the specified ID in the 'clothing' collection
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('clothing')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    // If there's an error, return a 400 Bad Request response with the error message
                    res.status(400).json({ message: err });
                }
            })
            .then((clothing) => {
            // Set the response headers and send a 200 OK response with the retrieved clothing item
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(clothing[0]);
        });
    } catch (err) {
        // If there's an error during the try block, return a 500 Internal Server Error response with the error message
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};
const createClothing = async (req, res) => {
    //#swagger.tags=['clothing']
    // Create a clothing object from the request body data
    const clothing = {
        name: req.body.name,
        materials: req.body.materials,
        design_and_patterns: req.body.design_and_patterns,
        functionality: req.body.functionality,
        cultural_symbolism: req.body.cultural_symbolism,
        traditional_accessories: req.body.traditional_accessories,
        historical_evolution: req.body.historical_evolution
    }
    // Insert the clothing object into the 'clothing' collection in the database
    const response = await mongodb.getDatabase().db().collection('clothing').insertOne(clothing);
    if (response.acknowledged) {
        // If successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the clothing.');
    }
};

const updateClothing = async (req, res) => {
    //#swagger.tags=['clothing']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid clothing id to update a clothing')
    }
    // Convert the request parameter to a valid ObjectId
    const clothingId = new ObjectId(req.params.id);
    // Create a clothing object from the request body data
    const clothing = {
        name: req.body.name,
        materials: req.body.materials,
        design_and_patterns: req.body.design_and_patterns,
        functionality: req.body.functionality,
        cultural_symbolism: req.body.cultural_symbolism,
        traditional_accessories: req.body.traditional_accessories,
        historical_evolution: req.body.historical_evolution
    }
    // Replace the existing clothing item with the specified ID in the 'clothing' collection
    const response = await mongodb.getDatabase().db().collection('clothing').replaceOne({ _id: clothingId }, clothing);
    if (response.modifiedCount > 0) {
        // If successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no modification occurred, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the clothing.');
        console.error('MongoDB Error:', response.err);
    }
};

const deleteClothing = async (req, res) => {
    //#swagger.tags=['clothing']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid clothings id to delete a clothing')
    }
    // Convert the request parameter to a valid ObjectId
    const clothingId = new ObjectId(req.params.id);
    // Delete the clothing item with the specified ID from the 'clothings' collection
    const response = await mongodb.getDatabase().db().collection('clothing').deleteOne({ _id: clothingId });
    if (response.deletedCount > 0) {
        // If successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no deletion occurred, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while deleting the clothing.');
    }
};

// Exporting the clothing CRUD functions for use in other modules
module.exports = {
    getAllClothing,
    getClothing,
    createClothing,
    updateClothing,
    deleteClothing
}