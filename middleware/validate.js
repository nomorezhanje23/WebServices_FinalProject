const validator = require('../helpers/validate');

// Middleware function for validating clothing data
const saveClothing = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        name: 'required|string',
        materials: 'required|array',
        'materials.*': 'required|string',
        design_and_patterns: 'required|array',
        'design_and_patterns.*.design': 'required|string',
        'design_and_patterns.*.patterns': 'required|array',
        'design_and_patterns.*.patterns.*': 'required|string',
        functionality: 'required|string',
        cultural_symbolism: 'required|string',
        traditional_accesories: 'array',          // An array of optional traditional accessories
        'traditional_accesories.*': 'string',     // Validation for each item in the optional array
        historical_evolution: 'required|string'
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

// Middleware function for validating contemporary issues data
const saveContemporary_issues = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        name: 'required|string',
        description: 'required|string',
        current_status: 'required|string',
        community_responses: 'required|array',
        'community_responses.*': 'required|string',
        resources: 'required|array',
        'resources.*': 'required|string',
        // Define additional validation rules for optional fields if needed
        // support_orginizations: 'required|array',
        // 'support_orginizations.*': 'required|string',
        suggested_actions: 'required|array',
        'suggested_actions.*': 'required|string'
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

// Middleware function for validating cuisine data
const saveCuisine = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        name: 'required|string',
        ingredients: 'required|array',
        'ingredients.*.name': 'required|string',
        'ingredients.*.quantity': 'required|string',
        preparation: 'required|string',
        serving_and_presentation: 'required|string',
        cultural_significance: 'required|string',
        taste_profile: 'required|string',
        variations: 'required|array',
        'variations.*': 'required|string',
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

// Middleware function for validating cultural data
const saveCultural = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        name: 'required|string',
        languages: 'required|array',
        'languages.*.name': 'required|string',
        'languages.*.dilects': 'required|array',
        'languages.*.dilects.*': 'required|string',
        beliefs: 'required|array',
        'beliefs.*': 'required|string',
        history: 'required|string',
        notable_figures: 'required|array',
        'notable_figures.*.name': 'required|string',
        'notable_figures.*.accomplishments': 'required|array',
        'notable_figures.*.accomplishments.*.accomplishment': 'required|string',
        historic_lands: 'required|array',
        'historic_lands.*.name': 'required|string',
        'historic_lands.*.area': 'required|array',
        'historic_lands.*.area.*.northCoordinate_longitude': 'required|string',
        'historic_lands.*.area.*.northCoordinate_latitude': 'required|string',
        'historic_lands.*.area.*.southCoordinate_longitude': 'required|string',
        'historic_lands.*.area.*.southCoordinate_latitude': 'required|string',
        'historic_lands.*.area.*.eastCoordinate_longitude': 'required|string',
        'historic_lands.*.area.*.eastCoordinate_latitude': 'required|string',
        'historic_lands.*.area.*.westCoordinate_longitude': 'required|string',
        'historic_lands.*.area.*.westCoordinate_latitude': 'required|string'
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

// Middleware function for validating historical sites and artifacts data
const saveHistorical_sites_and_artifacts = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        sight_name: 'required|string',
        sight_longitude: 'required|string',
        sight_latitude: 'required|string',
        sight_desciption: 'required|string',
        sight_visiting_information: 'required|string',
        sight_archaeological_findings: 'required|array',
        'archaeological_findings.*.designation': 'required|string',
        'archaeological_findings.*.location': 'required|string',
        'archaeological_findings.*.desciption': 'required|string',
        'archaeological_findings.*.piriod_epoch': 'required|string',
        'archaeological_findings.*.preservation_status': 'required|string'
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

/*
        title: req.body.title,
        origin: req.body.origin,
        synopsis: req.body.synopsis,
        moral_teachings: req.body.moral_teachings,
        characters: req.body.characters,
        variations: req.body.variations,
        source: req.body.source
*/

// Middleware function for validating stories and myths data
const saveStories_and_myths = (req, res, next) => {
    // Define validation rules using the validationRule object
    const validationRule = {
        title: 'required|string',
        origin: 'required|string',
        synopsis: 'required|string',
        moral_teachings: 'required|array',
        'moral_teachings.*': 'required|string',
        characters: 'required|array',
        'characters.*.character_name': 'required|string',
        'characters.*.character_description': 'required|string',
        variations: 'required|array',
        'variations.*.title': 'required|string',
        'variations.*.origin': 'required|string',
        'variations.*.synopsis': 'required|string',
        'variations.*.moral_teachings': 'required|array',
        'variations.*.moral_teachings.*': 'required|string',
        'variations.*.characters': 'required|array',
        'variations.*.characters.*.character_name': 'required|string',
        'variations.*.characters.*.character_description': 'required|string',
        'variations.*.sources': 'required|array',
        'variations.*.sources.*': 'required|string',
        sources: 'required|array',
        'sources.*': 'required|string'
    };

    // Use the validator function to check if the request body complies with the defined rules
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // If validation fails, send a 412 Precondition Failed response with details
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            // If validation passes, call the next middleware or route handler
            next();
        }
    });
};

// Export the saveStories_and_myths middleware
module.exports = {
    saveClothing,
    saveContemporary_issues,
    saveCuisine,
    saveCultural,
    saveHistorical_sites_and_artifacts,
    saveStories_and_myths
}