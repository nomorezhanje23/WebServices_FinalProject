const router = require('express').Router();
const passport = require('passport');

// Include Swagger documentation routes
router.use('/', require('./swagger'));

// Include routes related to different categories
router.use('/clothing', require('./clothing'));
router.use('/contemporary_issues', require('./contemporary_issues'));
router.use('/cuisine', require('./cuisine'));
router.use('/cultural', require('./cultural'));
router.use('/historical_sites_and_artifacts', require('./historical_sites_and_artifacts'));
router.use('/stories_and_myths', require('./stories_and_myths'));

// Route for user login using GitHub OAuth
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Route for user logout
router.get('/logout', function (req, res, next) {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Export the router module for use in the main application
module.exports = router;
