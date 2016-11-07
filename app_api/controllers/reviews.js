var mongoose = require('mongoose');
require('./../models/db');
//var review = mongoose.model('Review');

var loc = mongoose.model("Location");


var sendJSONResponse  = function(response, status, content) {
	response.status(status);
	response.json(content);
}



module.exports.createAReview = function (request,response){
	sendJSONResponse(response, 200, {"status": "success"});
};


module.exports.retrieveAReview = function(request,response){

	console.log("request to retrieve a review has been received...");

	loc
	.findById(request.params.locationid)
	.exec(function(err,theLocation){

		if (!theLocation){
			//Specified location does not exist
			sendJSONResponse(response,404, {"message": " Location does not exist"});
			return;
		}
		else if (err){
			//An error has occured
			sendJSONResponse(response, 404, err);
			return;
		}
		else{
			//Examine theLocation object and see if it has teh review of interest to us

			console.log(theLocation.reviews + " is retrieved...");
			if (theLocation.reviews && theLocation.reviews.length > 0){
				//Reviews exists and has a length greater than zero...

				review = theLocation.reviews.id(request.params.reviewid);

				if (!review){
					//If the review does not exist
					sendJSONResponse(response, 404, {"message" : "No reviews found"});
				}
				else{
					sendJSONResponse(response, 200, { "location": { "name": theLocation.name, "id" : request.params.locationid} , "review": review});
				}
			}
			else{
				sendJSONResponse(response, 404, {"message" : "No reviews found for this location"});
			}

		}

	});


};

module.exports.updateAReview = function(request,response){
	sendJSONResponse(response,200, {"status": "sucesss - updateAReview "});
};


module.exports.deleteAReview = function(request,response){
	sendJSONResponse(response,200, {"status": "sucesss - deleteAReview "});
};




