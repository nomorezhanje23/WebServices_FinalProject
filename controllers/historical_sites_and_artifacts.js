const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all historical sites and artifacts
const getAllHistorical_sites_and_artifacts = async (req, res) => {
    // Add a Swagger tag for API documentation
    //#swagger.tags=['historical_sites_and_artifacts']
    
    try {
        // Use MongoDB to retrieve all historical sites and artifacts from the collection
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historical_sites_and_artifacts')
            .find()
            .toArray((err, lists) => {
                if (err) {
                    res.status(400).json({ message: err });
                }
            })
            .then((historical_sites_and_artifacts) => {
                // Set the response content type to JSON
                res.setHeader('Content-Type', 'application/json');
                // Respond with a 200 status and the retrieved historical sites and artifacts
                res.status(200).json(historical_sites_and_artifacts);
            });
    } catch (err) {
        // If an error occurs during retrieval, respond with a 500 status and an error message
        res.status(500).json(response.err || "An error occurred. Please try again.");
    }
};

// Function to retrieve a specific historical site and artifact by ID
const getHistorical_sites_and_artifacts = async (req, res) => {
    // Add a Swagger tag for API documentation
    //#swagger.tags=['historical_sites_and_artifacts']
    
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid historical_sites_and_artifacts id to find a historical_sites_and_artifacts')
    }
    // Create an ObjectId from the request parameter ID
    const userId = new ObjectId(req.params.id);
    
    try {
        // Use MongoDB to find and retrieve the specified historical site and artifact document
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('historical_sites_and_artifacts')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    res.status(400).json({ message: err });
                }
            })
            .then((historical_sites_and_artifacts) => {
                // Set the response content type to JSON
                res.setHeader('Content-Type', 'application/json');
                // Respond with a 200 status and the retrieved historical site and artifact document
                res.status(200).json(historical_sites_and_artifacts[0]);
            });
    } catch (err) {
        // If an error occurs during retrieval, respond with a 500 status and an error message
        res.status(500).json(response.err || "An error occurred. Please try again.");
    }
};

// Function to create a new historical site and artifact document
const createHistorical_sites_and_artifacts = async (req, res) => {
    // Add a Swagger tag for API documentation
    //#swagger.tags=['historical_sites_and_artifacts']
    
    // Extract the historical site and artifact data from the request body
    const historical_sites_and_artifacts = {
        sight_name: req.body.sight_name,
        sight_longitude: req.body.sight_longitude,
        sight_latitude: req.body.sight_latitude,
        sight_desciption: req.body.sight_desciption,
        sight_visiting_information: req.body.sight_visiting_information,
        sight_archaeological_findings: req.body.sight_archaeological_findings
    }
    
    // Use MongoDB to insert the new historical site and artifact document into the collection
    const response = await mongodb.getDatabase().db().collection('historical_sites_and_artifacts').insertOne(historical_sites_and_artifacts);
    
    // Check if the insertion was acknowledged
    if (response.acknowledged) {
        // If acknowledged, respond with a 204 status (no content) indicating success
        res.status(204).send();
    } else {
        // If not acknowledged or an error occurred, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while updating the historical_sites_and_artifacts.');
    }
};
// Function to update an existing historical site and artifact document by ID
const updateHistorical_sites_and_artifacts = async (req, res) => {
    // Add a Swagger tag for API documentation
    //#swagger.tags=['historical_sites_and_artifacts']
    
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid historical_sites_and_artifacts id to update a historical_sites_and_artifacts')
    }
    // Create an ObjectId from the request parameter ID
    const historical_sites_and_artifactsId = new ObjectId(req.params.id);
    
    // Extract the updated historical site and artifact data from the request body
    const historical_sites_and_artifacts = {
        sight_name: req.body.sight_name,
        sight_longitude: req.body.sight_longitude,
        sight_latitude: req.body.sight_latitude,
        sight_desciption: req.body.sight_desciption,
        sight_visiting_information: req.body.sight_visiting_information,
        sight_archaeological_findings: req.body.sight_archaeological_findings
    }
    
    // Use MongoDB to replace the existing document with the updated data
    const response = await mongodb.getDatabase().db().collection('historical_sites_and_artifacts').replaceOne({ _id: historical_sites_and_artifactsId }, historical_sites_and_artifacts);
    
    // Check if the document was modified
    if (response.modifiedCount > 0) {
        // If modified, respond with a 204 status (no content) indicating success
        res.status(204).send();
    } else {
        // If not modified or an error occurred, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while updating the historical_sites_and_artifacts.');
        console.error('MongoDB Error:', response.err);
    }
};

// Function to delete a historical site and artifact document by ID
const deleteHistorical_sites_and_artifacts = async (req, res) => {
    // Add a Swagger tag for API documentation
    //#swagger.tags=['historical_sites_and_artifacts']
    
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid historical_sites_and_artifacts id to delete a historical_sites_and_artifacts')
    }
    // Create an ObjectId from the request parameter ID
    const historical_sites_and_artifactsId = new ObjectId(req.params.id);
    
    // Use MongoDB to delete the historical site and artifact document by ID
    const response = await mongodb.getDatabase().db().collection('historical_sites_and_artifacts').deleteOne({ _id: historical_sites_and_artifactsId });
    
    // Check if the document was deleted
    if (response.deletedCount > 0) {
        // If deleted, respond with a 204 status (no content) indicating success
        res.status(204).send();
    } else {
        // If not deleted or an error occurred, respond with a 500 status and an error message
        res.status(500).json(response.err || 'some error occurred while deleting the historical_sites_and_artifacts.');
    }
};

// Exporting the historical sites and artifacts CRUD functions for use in other modules
module.exports = {
    getAllHistorical_sites_and_artifacts,
    getHistorical_sites_and_artifacts,
    createHistorical_sites_and_artifacts,
    updateHistorical_sites_and_artifacts,
    deleteHistorical_sites_and_artifacts
}
