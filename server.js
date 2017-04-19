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
    "name":"Ahmed",
    "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
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
    "name":"Bob",
    "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
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

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});


// Search for Specific Character (or all characters) - provides JSON
app.get("/api/tables", function(req, res) {
    return res.json(reserved);
});


// Search for Specific Character (or all characters) - provides JSON
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});


// Create New Reservations - takes in JSON input
app.post("/api/reserve", function(req, res) {
    console.log("received post!");
    var newreserve = req.body;
    console.log("post received");
    console.log(newreserve);

    if (reserved.length < 5)
    {
        reserved.push(newreserve);
        res.json(true);
    }
    if (reserved.length >= 5)
    {
        waitlist.push(newreserve);
        res.json(false);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || 8080);
