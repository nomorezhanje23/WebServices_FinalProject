const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

const getAllContemporary_issues = async (req, res) => {
    //#swagger.tags=['contemporary_issues']
    // Retrieve all contemporary issues from the database
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contemporary_issues')
        .find()
        .toArray((err, lists) => {
            if (err) {
                // If there's an error, return a 400 Bad Request response with the error message
                res.status(400).json({ message: err });
            }
        })
        .then((contemporary_issues) => {
        // Set the response headers and send a 200 OK response with the contemporary issues data
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contemporary_issues);
    });
};

const getContemporary_issues = async (req, res) => {
    //#swagger.tags=['contemporary_issues']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid contemporary_issues id to find a contemporary_issues')
    }
    // Convert the request parameter to a valid ObjectId
    const userId = new ObjectId(req.params.id);
    
    try {
        // Retrieve a specific contemporary issue from the database using the provided ID
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('contemporary_issues')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    // If there's an error, return a 400 Bad Request response with the error message
                    res.status(400).json({ message: err });
                }
            })
            .then((conteporary_issues) => {
            // Set the response headers and send a 200 OK response with the found contemporary issue data
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(conteporary_issues[0]);
        });
    } catch (err) {
        // If there's an error, return a 500 Internal Server Error response with the error message
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};
const createContemporary_issues = async (req, res) => {
    //#swagger.tags=['contemporary_issues']
    // Create a new contemporary issue object from the request body
    const contemporary_issues = {
        name: req.body.name,
        description: req.body.description,
        current_status: req.body.current_status,
        community_responses: req.body.community_responses,
        resources: req.body.resources,
        support_orginizations: req.body.support_orginizations,
        suggested_actions: req.body.suggested_actions
    }
    // Insert the contemporary issue into the database
    const response = await mongodb.getDatabase().db().collection('contemporary_issues').insertOne(contemporary_issues);
    if (response.acknowledged) {
        // If insertion is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the contemporary_issues.');
    }
};

const updateContemporary_issues = async (req, res) => {
    //#swagger.tags=['contemporary_issues']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid contemporary_issues id to update a contemporary_issues')
    }
    // Convert the request parameter to a valid ObjectId
    const contemporary_issuesId = new ObjectId(req.params.id);
    // Create a contemporary issue object from the request body
    const contemporary_issues = {
        name: req.body.name,
        description: req.body.description,
        current_status: req.body.current_status,
        community_responses: req.body.community_responses,
        resources: req.body.resources,
        support_orginizations: req.body.support_orginizations,
        suggested_actions: req.body.suggested_actions
    }
    // Replace the existing contemporary issue in the database with the updated one
    const response = await mongodb.getDatabase().db().collection('contemporary_issues').replaceOne({ _id: contemporary_issuesId }, contemporary_issues);
    if (response.modifiedCount > 0) {
        // If modification is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no modifications, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the contemporary_issues.');
        console.error('MongoDB Error:', response.err);
    }
};

const deleteContemporary_issues = async (req, res) => {
    //#swagger.tags=['contemporary_issues']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid contemporary_issuess id to delete a contemporary_issues')
    }
    // Convert the request parameter to a valid ObjectId
    const contemporary_issuesId = new ObjectId(req.params.id);
    // Delete the contemporary issue from the database
    const response = await mongodb.getDatabase().db().collection('contemporary_issuess').deleteOne({ _id: contemporary_issuesId });
    if (response.deletedCount > 0) {
        // If deletion is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no deletions, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while deleting the contemporary_issues.');
    }
};

// Exporting the contemporary_issues CRUD functions for use in other modules
module.exports = {
    getAllContemporary_issues,
    getContemporary_issues,
    createContemporary_issues,
    updateContemporary_issues,
    deleteContemporary_issues
}