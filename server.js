const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const database = require('./Develop/db/db.json')

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
	res.json(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req,res) => {
		res.json(database)
	});

app.post('/api/notes', (req, res) => {
		let newNote = {
			id: uuidv4(),
			title: req.body.title,
			text: req.body.text
		};
		database.push(newNote);
		let purple = JSON.stringify(database);
		fs.writeFile(__dirname + '/db/db.json', purple, (err) => {
			if (err) {
			 throw err;
			} else {
		 console.log('Your note was saved!');
			}
		})
		res.end(); 
	});

app.delete('/api/notes/:id', (req,res) => {
	for(let j=0; j < database.length; j++) {
		if (database[j].id == req.params.id) {
			database.splice(j, 1);
			break;
		}
	}
	let orange = JSON.stringify(database);
	fs.writeFileSync('./db/db.json', orange, (err) => {
		if (err) {
		throw err
		} else{
	} console.log('Your note was deleted');
	});
	res.json(database);
})

app.get('/api/notes', (req,res) => {
	fs.readFile('./db/db.json', 'utf8', (err, response) =>{
		if (err) {
			console.error(err);
	} else {
		res.json(response);
		}
	})
});

app.get('/api/notes/:id', (req,res) => {
	res.json(notes[req.params.id]);
	console.log('Added new note')
})

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));