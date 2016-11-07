

var earthRadius = 6371;

var getDistanceFromRads = function(rads){

	console.log("getDistanceFromRads invoked with rads:" + rads);
	console.log("about to return -"+ rads * earthRadius);
	return parseFloat(rads * earthRadius);
}

var getRadsFromDistance = function(distance){

	console.log("getRadsFromDistance invoked with distance: " + distance);
	console.log("about to return -"+ distance / earthRadius);
	return parseFloat(distance / earthRadius);
}


module.exports = {
  getDistanceFromRads: getDistanceFromRads,
  getRadsFromDistance: getRadsFromDistance
};