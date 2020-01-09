const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// For it to be able to read all my public files
app.use(express.static("public"));


// API Routes (pass info)
app.get("/api/notes", () => {
    // fs.readFile(db.)
});
app.post("/api/notes", () => {
    // read file and add to it add property to object for that id  
});
app.delete("/api/notes/:id", () => {
    // read delete rewrite look at front end to see how the grab id we gotta read, logic and delete that id (filter), rewrite file
});

// HTML Routes  (shows you the page)
app.get("/notes", () => {

});
// this is  a wildcard
app.get("*", () => {

})



app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})