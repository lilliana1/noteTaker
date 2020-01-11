const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// For it to be able to read all my public files
app.use(express.static("public"));


// ----------------------------------API ROUTES--------------------------------------------------------------
// API Routes (pass info)
// API GET Requests. Below code handles when users "visit" a page. In each of the below cases when a user visits a link
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", (err, data)=> {
    if(err) throw err;
    res.json(JSON.parse(data))
})
});
// API POST Requests. Below code handles when a user submits a form and thus submits data to the server. In each of the below cases, when a user submits form data (a JSON object) the JSON is pushed to the appropriate JavaScript array
app.post("/api/notes", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note has been created", newNote);
  res.json(savedNotes);
})

// Delete out notes

app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Note has been deleted`);
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteID;
  })
  
  for (currNote of savedNotes) {
      currNote.id = newID.toString();
      newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})
// ----------------------------------END API ROUTES--------------------------------------------------------------

// ---------------------------------HTML ROUTES---------------------------------------------------------------

// HTML Routes  (shows you the page)

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});
// this is  a wildcard
app.get("*", function(req,res){
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// ---------------------------------END OF HTML ROUTES---------------------------------------------------------------

// waiting to be called
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})