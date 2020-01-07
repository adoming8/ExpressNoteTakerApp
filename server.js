
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; // Heroku Port formatt
var notesSaved = require('./db/db.json')

// Set up miiddleware to handle data parsing
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
// Basic route that sends the user first two AJAX request for html files

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });