var mongoose = require('mongoose');
require('./../models/db');
var loc = mongoose.model('Location');

//Importing the distance.js file
var theEarth = require ('./distance');


var sendJSONResponse  = function(response, status, content) {
	response.status(status);
	response.json(content);
}



module.exports.createALocation = function (request,response){
	sendJSONResponse(response, 200, {"status": "success"});
};


module.exports.locationsListByDistance = function(request,response){


	var latitude = parseFloat(request.query.latitude);
	var longitude = parseFloat(request.query.longitude);

	console.log("Latitude is:" + latitude);
	console.log("longitude is:" + longitude);

	if (!latitude || !longitude){
		//If one or both parameters are null then return an eror message
		sendJSONResponse(response, 404, {"message": "The parameters Latitude and Longitude are required...."});
	}


	var point = {
		type: "Point",
		coordinates: [longitude,latitude]

	};

	var geoOptions = {
		spherical:true,
		//maxDistance: theEarth.getRadsFromDistance(20),
		//num: 10
	};

	//Use find to get all the locations and use geoNear to get locations that are closer to the coordinates
	//loc.find( function(err,resultsList)
	loc.geoNear(point,geoOptions, function (err, resultsList,stats)
	{

		console.log("ResultsList is:" + resultsList);
		//This contains the distance and the object  {"dis": 0, "obj": .....}
		//The results list is converted to a locations object..
		var locations = [];

	if (err){
		//Error occured while perfomring the locationList using geonear
		sendJSONResponse(response, 404, err);
		return;
	}
	else {
		//Check the length of the resultslist 
		console.log("locations.length:[" + resultsList.length + "].") ;

		if (resultsList.length > 0){
			//There is something in the resultslist..
			//Iterate the list and extract the location info from them and place it in the locations array...

			resultsList.forEach(function(doc){
				locations.push({
					distance : theEarth.getDistanceFromRads(doc.dis),
					name: doc.obj.name,
					address: doc.obj.address,
					rating: doc.obj.rating,
					facilities: doc.obj.facilities,
					_id: doc.obj._id

				});

			});

			sendJSONResponse(response, 200, locations);
		}
		else{
			sendJSONResponse(response,404, { message: "No locations near you"});
		}

	}

	});


};


var buildLocationsList = function(request,response, resultsList,stats){

	resultsList.forEach(function(doc){

			console.log("Distance from DB is:" + doc.dis);

			distInKms = theEarth.getDistanceFromRads(doc.dis);

			console.log("Distance in kms is "+ distInKms);

			locations.push({

				distance: distInKms,
				name: doc.obj.name,
				address: doc.obj.address,
				rating: doc.obj.rating,
				facilities : doc.obj.facilities,
				_id: doc.obj._id

			});

		});
};



module.exports.retrieveALocation = function(request,response){

	console.log("About to retrieve a location with locationID:" + request.params.locationid);

	loc
	.findById(request.params.locationid)
	.exec(function (err, theLocation){

		console.log("location is" + theLocation);

		if (!theLocation){
			//theLocation is null
			sendJSONResponse(response,404, {"message" : "locationId not found"});
			return;
		}
		else if (err){
			sendJSONResponse(response,404, err);
			return;
		}
		else{
			sendJSONResponse(response,200, { location: theLocation});
}
	});
	
};


module.exports.updateALocation = function(request,response){
	sendJSONResponse(response,200, {"status": "sucesss - lupdate ocations "});
};

module.exports.deleteALocation = function(request,response){
	sendJSONResponse(response,200, {"status": "sucesss - Delete Location"});
};



