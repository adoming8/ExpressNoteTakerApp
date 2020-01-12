
// Dependencies
// =============================================================
var express = require ('express');
var path = require ('path');
var fs = require ('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; // Heroku Port formatt
var notesSavedArr = require('./db/db.json')

// Set up miiddleware to handle data parsing
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
// Basic route that sends the user first two AJAX request for html files

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname, "public/notes.html"));
});
  
// API Routes
//Displays all notes Saved in obj

app.get("/api/notes", function (request, response) {
    response.json(notesSavedArr);
});

// API POST route to send new note
app.post("/api/notes", function (request, response) {
    var newNote = request.body;
    // console.log(newNote)
    newNote.id = Math.round(Math.random() * 9999); // adding unique id to each note created
    notesSavedArr.push(newNote);
    console.log(notesSavedArr)
    fs.writeFileSync("./db/db.json", JSON.stringify(notesSavedArr, null, 2), "utf-8")
    response.json(newNote);
});

// API route to DELETE note by ID 
app.delete('/api/notes/:id', (request, response) => {

    // using object literals to find the id in notesSavedArr object
    var note2Delete = notesSavedArr.find(
        function({id}){id === JSON.parse(request.params.id)
    });
    // removes object at index of note id
    notesSavedArr.splice(notesSavedArr.indexOf(note2Delete));
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notesSavedArr, null, 2), "utf-8")
    response.end("Deciered note Deleted, Note Obj rewritten");
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });