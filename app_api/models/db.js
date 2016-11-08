var mongoose = require('mongoose');
require('./locations');
var cfenv = require('cfenv');


//get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// set the default value to islocal (i.e app is running locally) 
var isLocal = true; 
var dbURI = 'mongodb://localhost/Loc8r';//set the DB to the local database

if (appEnv) {
	// If appEnv is not null then print the object so that we can see what is in
	// it...
	console.log("App Env is:" + JSON.stringify(appEnv));
	console.log("is the app running locally:" + isLocal);
}

if (!isLocal){
	//If it is a remote execution (i.e Bluemix use the information from the VCAP Services...
	
	var serviceName = "compose-for-mongodb";
	dbURI = appEnv.services[serviceName] ? appEnv.services[serviceName][0].credentials.uri: ""; 
}

console.log("dbURI is:"+ dbURI);

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error:' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
	});
};

// For nodemon restarts
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// For app termination..
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	})
});

// For Heroku App termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});

});

