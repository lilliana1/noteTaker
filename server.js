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


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function (req, res) {
    
    fs.readFile("db/db.json", "utf8", (err, data)=>{
      if(err) throw err;
      res.json(JSON.parse(data))
  
    })

    // res.sendFile(path.join(__dirname, "/db/db.json"))
    // res.send(db);

});

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------
// app.post("/api/notes", () => {
//     // read file and add to it add property to object for that id  

// });
    app.post("/api/notes", function(req, res) {
      let uniqueId = "";
      for (let i = 0; i < newNote.length; i++) {
      newNote[i].uniqueId = i + 1;
      }
      let newNote = {
        title: req.body.title,
        text :req.body.text,
        "id": uniqueId
      }
      // read file
    fs.readFile(path.join(__dirname + "/db/db.json"),(err, data) => {
    if (err) {
      console.log(err);
    }
    
    
    let allNotesArray = JSON.parse(data);
    // Append newReservation into reservationArray
    allNotesArray.push(newNote);

    fs.writeFile(path.join(__dirname, "/db/db.json"),JSON.stringify(allNotesArray), (err) => {
    if (err) {
    console.log(err);
    }
    console.log("Note has been written");
    });
    });
    
  
  // ---------------------------------------------------------------------------
  // Delete out notes
//     app.delete("/api/notes/:id", function(req, res) {
//       //code to delete note
// });
    app.delete("/api/notes/:id", (req, res) => {

      fs.readFile("./db/db.json", (err, data) => {
        if (err) 
        throw err;
        
        const newAllNotes = allNotes.map()

        fs.writeFile("./db/db.json", JSON.stringify(newAllNotes), err => {
          if (err) 
          throw err;
          // res.sendFile(path.join(__dirname, "/db/db.json"))
          res.send(db);
          console.log("You just deleted the note")
        });
      });
});
})
// ---------------------------------HTML ROUTES---------------------------------------------------------------

// HTML Routes  (shows you the page)

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});
// this is  a wildcard
app.get("*", function(req,res){
  res.sendFile(path.join(__dirname + "/public/index.html"));
});




app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})