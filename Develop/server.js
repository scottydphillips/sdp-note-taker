const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const index = require('./public/assets/js/index.js')

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req,res) => {
	index.getNotes()
	.then((results) => res.json(results));
});

app.post('/api/notes', (req,res) => {
	const newNote = req.body;
	console.log(newNote);
	notes.push(newNote);
	// fs.appendFile('./db/db.json', index.renderActiveNote())
})

// app.delete('/api/notes', (req,res) => {
// 	notes.shift[i]
// })

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));