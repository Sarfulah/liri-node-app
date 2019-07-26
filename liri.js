require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
// var movieName = process.argv[3];
var userChoice = function (command, term) {

    switch (command) {
        case "concert-this":
            bandsInTown(term);
            break;

        case "spotify-this-song":
            spotify(term);
            break;

        case "movie-this":
            omdbSearch(term);
            break;

        case "do-what-it-says":
            doWhatItSays(term);
            break;
    }
    function bandsInTown(artist) {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
        axios.get(queryUrl).then(
            function (response) {
                console.log(response.data[0]);
            })
    }
}
userChoice(command, term);

// Then run a request with axios to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

//     .catch(function (error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log("---------------Data---------------");
//             console.log(error.response.data);
//             console.log("---------------Status---------------");
//             console.log(error.response.status);
//             console.log("---------------Status---------------");
//             console.log(error.response.headers);
//         } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//         }
//         console.log(error.config);
//     });
