const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req,res) => {
	res.sendFile(path.join(__dirname, './public/notes.html'));
})

// app.get('api/notes', (req,res) => {
// 		res.json(database)
// 	});

// app.post('api/notes', (req, res) => {
// 		let jsonPath = path.join(__dirname, './db/db.json');
// 		let newNote = req.body;
// 		let highestNote = 99;
// 		for(let i=0; i<database.length; i++) {
// 			let singleNote = database[i];
// 			if(singleNote.id > highestNote) {
// 				highestNote = singleNote.id;
// 			}
// 		}
// 		newNote.id = highestNote + 1;
// 		database.push(newNote);
// 		fs.writeFile(jsonPath, JSON.stringify(database), (err) => {
// 			if (err) {
// 			 throw err
// 			} else{
// 		 console.log('Your note was saved!')
// 			}
// 		})
// 		res.json(newNote); 
// 	});

// app.delete('api/notes/:id', (req,res) => {
// 	let jsonPath = path.join(__dirname, './db/db.json');
// 	for(let j=0; j<database.length; j++) {
// 		if (database[j].id == req.params.id) {
// 			database.splice(j, 1);
// 			break;
// 		}
// 	}
// 	fs.writeFileSync(jsonPath, JSON.stringify(database), (err) => {
// 		if (err) {
// 		throw err
// 		} else{
// 	} console.log('Your note was deleted');
// 	});
// 	res.json(database);
// })

app.get('/api/notes', (req,res) => {
	fs.readFile('./db/db.json', 'utf8', (err, response) =>{
		if (err) {
			console.error(err);
	} else {
		res.json(response);
		}
	})
});

app.post('/api/notes', (req,res) => {
	let newNote = req.body.id;
	fs.writeFile('./db/db.json', JSON.stringify(newNote), 'utf8', (err) => {
		if (err) throw err;
	})
	res.send(newNote);
})

app.get('/api/notes/:id', (req,res) => {
	res.json(notes[req.params.id]);
	console.log('Added new note')
})

app.delete('/api/notes/:id', (req,res) => {
	notes.shift(req.params.id);
	console.log('Note deleted')
})

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));