var inquirer = require("inquirer");
var fs = require('fs');
var Twitter = require('twitter');
var twitterKeys = require("./keys.js");
var client = new Twitter(twitterKeys);
var Spotify = require('node-spotify-api');
var spotifyKeys = require("./keys.js");
var spotifySearch = new Spotify(spotifyKeys);



console.log("Ready!")

function getAction() {
	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "What do you want to do?  You can choose my-tweets, spotify-this-song, movie-this, or feeling-lucky.",
	      name: "chooseAction"
	    },    
	    ])
	 .then(function(inquirerResponse) {
	 	var input = (inquirerResponse.chooseAction);
	 	console.log("--> Running the " + input + " function");
		if (input == "my-tweets") {
			tweets();
		} else if (input == "spotify-this-song") {
			inquirer
	  			.prompt([
	    			{
					type: "input",
					message: "Which song?",
					name: "chooseSong"
				    },    
		    		]).then(function(inquirerResponse) {
	 					var songData = (inquirerResponse.chooseSong);
	 					spotify(songData);
		    		});
		} else if (input == "movie-this") {
			inquirer
	  			.prompt([
	    			{
					type: "input",
					message: "Which movie?",
					name: "chooseMovie"
				    },    
		    		]).then(function(inquirerResponse) {
	 					var movieData = (inquirerResponse.chooseMovie);
						movie(movieData);
		    		});			
		} else if (input == "feeling-lucky") {
			doThis();
		}
	 });
};


function tweets () {
	// show last 20 tweets and when they were tweeted
	console.log("----------------\nHere are your last 20 tweets:\n-------------------");
	
	var params = {user: 'nodejs', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		// console.log(tweets);
    		fs.appendFile('log.txt', ("\n>>>>>>>>>> The 'tweets' function was called on " + (new Date().toUTCString()) + "<<<<<<<<<<\n"), function (err) {if (err) throw err;});
    		for (i=0; i<tweets.length; i++) {
    			var output = (tweets[i].created_at + "\n" + tweets[i].text + "\n-----------\n")
    			console.log(output);
 				fs.appendFile('log.txt', output, function (err) {if (err) throw err;});
    			};
  		} else {
  			console.log(error)
  		}
	}); 
};

function spotify(title) {
	console.log("Here is the information about the song you requested: " + title);

	
	spotifySearch.search({ type: 'track', query: title, limit: 5 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data); 
	});


	// spotifySearch
	// 	.search({ type: 'track', query: title, limit: 5 })
	// 	.then(function(response) {
	// 		for (i=0; i<5; i++) {
 //    			var output = (response.items[i] + "\n-----------\n")
 //    			console.log(output);
 // 				// fs.appendFile('log.txt', output, function (err) {if (err) throw err;});
 //    		};
	// 		})
	// 	.catch(function(err) {
	// 	console.log(err);
	// 	});

	// display:
	// artist
	// song name
	// preview link of song from spotify
	// album
	// show default data if not specified
};

function movie(title) {
	console.log("Here is the information about the movie you requested: " + title);
	// display:
	//    * Title of the movie.
 //       * Year the movie came out.
 //       * IMDB Rating of the movie.
 //       * Rotten Tomatoes Rating of the movie.
 //       * Country where the movie was produced.
 //       * Language of the movie.
 //       * Plot of the movie.
 //       * Actors in the movie.
 // 	* show default data if not specified
};

function doThis() {
	console.log("Surprise! This doesn't do anything.  Hahahahahaha");
	// code here
};

getAction();