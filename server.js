// Friend Finder demo app - Blair Erickson on 4/13/17.


// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservation data
// =============================================================
var friendbase = [{
    "name":"Andy",
    "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores":[
        5,
        1,
        1,
        1,
        5,
        1,
        3,
        2,
        3,
        1
    ]
}, {
    "name":"Bob",
    "photo":"http://www.sullysullenberger.com/wp-content/uploads/2014/08/Sully-Hero-Shot-Homepage2014-720.png",
    "scores":[
        5,
        1,
        4,
        4,
        5,
        1,
        2,
        5,
        4,
        1
    ]
}, {
    "name":"Sally",
    "photo":"https://pbs.twimg.com/profile_images/497539872358281216/HhyHrWdZ.jpeg",
    "scores":[
        3,
        1,
        3,
        4,
        5,
        2,
        1,
        1,
        4,
        1
    ]
}
];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

// See whole friends list - provides JSON
app.get("/api/friends", function(req, res) {
    return res.json(friendbase);
});


// Create New Friend for Search - takes in JSON input
app.post("/api/friends", function(req, res) {
    console.log("received new friend!");
    var newperson = req.body;
    console.log("post received");
    console.log(newperson);

    // goes through the database and pulls out each friend's scores to build a comparison table.
    for(i=0;i<friendbase.length;i++){
      console.log(friendbase[i].scores);
       var compareB = newperson.scores;
       var compareA = friendbase[i].scores;
       var summed =0;

       // this algorithm compares the scores of the friend in the database to the new received friend data.
       console.log(compareA + " comparing to " + compareB);
        for(y=0;y<compareA.length;y++){
            summed += (compareA[y] - compareB[y]);
            console.log(summed);
        }

    }

    friendbase.push(newperson);

    return res.json(friendbase);

});

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 8080);
