var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends.js");


// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/api/friends", function(request, response) {
  	response.json(friends);
});

app.post("/api/friends", function(request, response) {
	console.log(request.body);
	var friendsTotalScores = [];
	for (var i = 0; i < friends.length; i++) {
		friendsTotalScores.push(friends[i].scores.reduce(getSum));
	}
	var myTotalScore = request.body.scores.reduce(getSum);
	var closestFriendsDifference = friendsTotalScores.map(function(score){
		return Math.abs(score - myTotalScore);
	})
	var closestFriendDifference = Math.min.apply(Math, closestFriendsDifference);
	var closestFriendIndex = closestFriendsDifference.indexOf(closestFriendDifference);
	var closestFriend = friends[closestFriendIndex];
	response.json(closestFriend);
	friends.push(request.body);
});

// Starts the server to begin listening
app.listen(PORT, function() {
  	console.log("App listening on PORT " + PORT);
});

function getSum(total, num) {
    return total + num;
}
