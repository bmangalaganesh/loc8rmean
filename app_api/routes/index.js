var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

//Locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.createALocation);
router.get('/locations/:locationid', ctrlLocations.retrieveALocation);
router.put('/locations/:locationid', ctrlLocations.updateALocation);
router.delete('/locations/:locationid',ctrlLocations.deleteALocation);


//Reviews

router.post('/locations/:locationid/reviews', ctrlReviews.createAReview);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.retrieveAReview);
router.put('/locations/:locationid/reviews/:reviewid',ctrlReviews.updateAReview);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.deleteAReview);

module.exports = router;
