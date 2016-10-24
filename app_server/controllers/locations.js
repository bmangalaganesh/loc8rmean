module.exports.homelist = function(req,res,next){
 res.render('locations-list', {

 	title:'Home',
 	pageHeader: {
 		title: 'Loc8r',
 		strapline: 'Find places to work with wifi near you'
 	},
 	sidebar: "Looking for wifi and a seat? This info goes to the sidebar...",
 	locations: [{
 		name: 'Starcups',
 		address: '125 High Street Glen Waverley VIC 3150',
 		rating: 3,
 		facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
 		distance:'100m'

 	},
 	{
 		name: 'Cafe Hero',
 		address: '125 Sprinvale Road Glen Waverley VIC 3150',
 		rating: 4,
 		facilities: ['Hot Drinks', 'Premium Wifi'],
 		distance:'200m'

 	}]
 });

};


module.exports.locationInfo = function(req,res,next){
 res.render('location-info', {
 	title: ' Location Info...',
 	location:{
 		name:'Starcups',
 		address: '125 High Street Glen Waverley VIC 3150',
 		rating:3,
 		facilities: ['Hot Drinks', 'Food12', 'Premium Wifi'],
 		distance: '100m',
 		mapURL:'http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2',

 		reviews:[
 		{
 			author:' Simon Hope',
 			timestamp:'3 October 2016',
 			rating: 3,
 			comment: 'What a great place. I can\'t say enough good things about it.'

 		},

 		{
 			author:' Josh Gibson',
 			timestamp:'3 Febrauary 2016',
 			rating: 4,
 			comment: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
 		}
 		],

 		openingHours: ['Monday - Friday : 7:00am - 7:00pm', 'Saturday : 8:00am - 5:00pm', 'Sunday : closed']
 	}




 });
};

module.exports.addReview = function(req,res,next){
 res.render('location-review-form', { title: 'Add review'});
};



