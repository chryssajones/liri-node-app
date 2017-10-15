var inquirer = require("inquirer");
console.log("Ready!")

function getAction() {
	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "What do you want to do?  You can choose my-tweets, spotify-this-song, movie-this, or feeling-lucky.",
	      name: "chooseAction"
	    },
	    {
	      type: "input",
	      message: "Which hashtag or song do you want?",
	      name: "chooseData"
	    },	    
	    ])
	 .then(function(inquirerResponse) {
	 	var input = (inquirerResponse.chooseAction);
	 	var data = (inquirerResponse.chooseData);
	 	console.log(input, data);

	 });
};

var input = process.argv[2];
var data = process.argv[3];

if (input == "my-tweets") {
	tweets();
} else if (input == "spotify-this-song") {
	spotify(data);
} else if (input == "movie-this") {
	movie(data);
} else if (input == "do-what-it-says") {
	doThis();
}


function tweets () {
	// show last 20 tweets and when they were tweeted
};

function spotify (title) {
	// display:
	// artist
	// song name
	// preview link of song from spotify
	// album
	// show default data if not specified
};

function movie(title) {
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
	// code here
};
