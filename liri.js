require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var command = process.argv[2];
// var movieName = process.argv[3];
var term = process.argv.slice(3).join(" ");
var userChoice = function (command, term) {

    switch (command) {
        case "concert-this":
            bandsInTown(term);
            break;

        case "spotify-this-song":
            spotifyThis(term);
            break;

        case "movie-this":
            omdbSearch(term);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
    function bandsInTown(artist) {
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(queryUrl).then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[3]);
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city);
                    console.log("Date: " + moment(response.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY"));

                    fs.appendFileSync("log.txt", "\r\n" + "Venue: " + response.data[i].venue.name + "\r\n", "utf8");
                    fs.appendFileSync("log.txt", "\r\n" + "Location: " + response.data[i].venue.city + "\r\n", "utf8");
                    fs.appendFileSync("log.txt", "\r\n" + "Date: " + moment(response.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY") + "\r\n", "utf8");
                }
            })
    }

    function spotifyThis() {

        if (!term) {
            term = "The Sign by Ace of Base"
        }
        spotify.search({ type: "track", query: term }, function (err, data) {
            if (err) {
                return console.log("Error ocurred: " + err);
            }
            // console.log(data.tracks.items)
            var songInfo = data.tracks.items[0];

            //console.log(songInfo)

            for (i = 0; i < songInfo.artists.length; i++) {
                console.log("Artist: " + songInfo.artists[i].name);
                console.log("Song: " + songInfo.name);
                console.log("URL: " + songInfo.preview_url);
                console.log("Album: " + songInfo.album.name);
            };
        })
    }


    function omdbSearch(movie) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);

                fs.appendFileSync("log.txt", "\r\n" + "Title: " + response.data.Title + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Release Year: " + response.data.Year + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "IMDB Rating: " + response.data.imdbRating + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Rotten Tomatoes: " + response.data.Ratings[1].Value + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Country: " + response.data.Country + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Language: " + response.data.Language + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Plot: " + response.data.Plot + "\r\n", "utf8");
                fs.appendFileSync("log.txt", "\r\n" + "Actors: " + response.data.Actors + "\r\n", "utf8");
            })
    }

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function (err, data) {
            console.log(data)

            var dataArray = data.split(",");
            if (dataArray.length === 2) {
                userChoice (dataArray[0], dataArray[1]);
            } else if (dataArray.length === 1) {
                userChoice (dataArray[0]);
            }
        });
    };

}
userChoice(command, term);

