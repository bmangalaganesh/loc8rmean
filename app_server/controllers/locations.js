var request = require('request'); //Allows us to work with APIs


//TODO - Find a way to refactor this so that i can be parametrised into a seperate module..
//var 


var renderHomePage = function(req, resp,responseBody){


 console.log("Response Body is:" + JSON.stringify(responseBody));
	//INstead of sending back the hardcoded list make the API call and return that to 
	//resoponse render (as a JSON object)
 resp.render('locations-list', {

 	title:'Home',
 	pageHeader: {
 		title: 'Loc8r',
 		strapline: 'Find places to work with wifi near you'
 	},
 	sidebar: "Looking for wifi and a seat? This info goes to the sidebar...",
 	locations: responseBody
 });
}

//Render the view for a single location
var renderALocationPage = function(req,resp, responseBody){
	resp.render('location-info',{
		title: responseBody.location.name,
		location: responseBody.location
	});
}


module.exports.homelist = function(req,res,next){

	var locationsListRequestOptions, path;
	var server = "http://localhost:3000";
	path = "/api/locations";

	locationsListRequestOptions = {
		url: server + path,
		method: "GET",
		json: {},
		qs: {
			latitude: -37.8797810,
			longitude: 145.1630730
		}
	}

	//make the API call here..
	request(locationsListRequestOptions, function(err, response, body){
		
	console.log("Err is:" + err);
	console.log("response is:" + JSON.stringify(response));
	console.log("body is:" + JSON.stringify(body));

	if (err){ //Err is not null
		console.log("Error is:" + err);

	}
	else{
	//Examine the response object's status code
	console.log("Response from API call  returned with status code:"+ response.statusCode);
	if (response.statusCode == 200){
		renderHomePage(req,res,body);
		}
	else{
		//Render the error page to the users -- TODO
		console.log("Error returned from API call:" + body + " with status code:" + response.statusCode);
		res.render("error", { message: body, 
					error: {
						status: response.statusCode

		}});
		}

	}
	});



};


module.exports.locationInfo = function(req,res,next){

console.log("About to retrieve information for locationid" + req.params.locationid);
var aLocationRequestOptions, path;
var server = "http://localhost:3000";
path = "/api/locations/" + req.params.locationid;

aLocationRequestOptions = {
	url: server + path,
	method: "GET",
	json: {}

}


request(aLocationRequestOptions, function(err,response,body){

	console.log("Err is:" + err);
	console.log("response is:" + JSON.stringify(response));
	console.log("body is:" + JSON.stringify(body));

	if (err){
		console.log("Error occured while fetching a location:" + err);
	}
	else {

		if (response.statusCode == 200){
			renderALocationPage(req,res,body);
		}
		else{
			res.render("error", 
				{message: body,
				 error: {
				 	status: response.statusCode
				 }});
		}

	}
});




};

module.exports.addReview = function(req,res,next){
 res.render('location-review-form', { title: 'Add review'});
};



