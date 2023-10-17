const mongodb = require('../data/database'); // Import the MongoDB connection
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all cultural information
const getAllCultural = async (req, res) => {
    //#swagger.tags=['cultural']
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('cultural')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
        })
        .then((cultural) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cultural);
    });
};

// Function to retrieve specific cultural information by ID
const getCultural = async (req, res) => {
    //#swagger.tags=['cultural']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid cultural id to find a cultural')
    }
    const userId = new ObjectId(req.params.id);
    
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('cultural')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    res.status(400).json({ message: err });
                }
            })
            .then((cultural) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(cultural[0]);
        });
    } catch (err) {
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};

// Function to create new cultural information
const createCultural = async (req, res) => {
    //#swagger.tags=['cultural']
    const cultural = {
        name: req.body.name,
        languages: req.body.languages,
        beliefs: req.body.beliefs,
        traditions: req.body.traditions,
        history: req.body.history,
        notable_figures: req.body.notable_figures,
        historic_lands: req.body.historic_lands
    }
    const response = await mongodb.getDatabase().db().collection('cultural').insertOne(cultural);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occurred while updating the cultural.');
    }
};
const updateCultural = async (req, res) => {
    //#swagger.tags=['cultural']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid cultural id to update a cultural')
    }
    const culturalId = new ObjectId(req.params.id);
    const cultural = {
        name: req.body.name,
        languages: req.body.languages,
        beliefs: req.body.beliefs,
        traditions: req.body.traditions,
        history: req.body.history,
        notable_figures: req.body.notable_figures,
        historic_lands: req.body.historic_lands
    }
    const response = await mongodb.getDatabase().db().collection('cultural').replaceOne({ _id: culturalId }, cultural);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occurred while updating the cultural.');
        console.error('MongoDB Error:', response.err);
    }
};

const deleteCultural = async (req, res) => {
    //#swagger.tags=['cultural']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid culturals id to delete a cultural')
    }
    const culturalId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cultural').deleteOne({ _id: culturalId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occurred while deleting the cultural.');
    }
};

// Exporting the cultural CRUD functions for use in other modules
module.exports = {
    getAllCultural,
    getCultural,
    createCultural,
    updateCultural,
    deleteCultural
}