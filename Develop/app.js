const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 42069;

// Useful APIs
//
// path.join api
// https://nodejs.org/api/path.html#path_path_join_paths
//
// express api
// https://expressjs.com/en/api.html

function getNotes() {
  // read file into javascript object using fs
  const notesPath = path.join(__dirname, 'db/db.json');
  const notesFileContents = fs.readFileSync(notesPath);
  return JSON.parse(notesFileContents);
}

// localhost:42069/notes returns notes.html
app.get('/notes', (req, res) => {
  // __dirname resolves to your project folder...
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  /// return file contents as json.
  res.json(getNotes());
});

// localhost:42069/notes returns index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {
  // parse new note from POST request body
  let newNote = req.body;
 
  // read your notes from your local database
  let notes = getNotes();

  // add your new note from above to notes.
  // HINT you'll need to generate a new id.
  
  // write new javascript object to file
  fs.appendFile('db/db.json', newNote, (err) => {
    if (err) throw err;
    console.log('Note successfully added');
  });
});

app.delete('/api/notes/:id', (req, res) => {
  // get note id from request body

  // read database file
  let notes = getNotes();

  // remove id

  // write database file to same location
  fs.appendFile('db/db.json', newData, (err) => {
    if (err) throw err;
    console.log('Note successfully deleted');
  });
});

app.listen(port, () => {
    console.log(`Notetaking app is running at http:://localhost:${port}`);
});
