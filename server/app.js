const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const DATABASE_FILE_PATH = './data/database.json';

const app = express();
app.use(cors());
app.use(bodyParser());
app.listen(5000, () => console.log('Listening on port 5000 ...'));

app.get('/', (req, res) => {
	fs.readFile(DATABASE_FILE_PATH, (err, data) => {
		if (err) console.log('ERROR: ', err);
		else res.send(data);
	});
});

app.post('/', (req, res) => {
	fs.writeFile(DATABASE_FILE_PATH, JSON.stringify(req.body), (err) => {
		if (err) console.log('ERROR: ', err);
		else console.log('Database file has been successfully updated!');
	});
	
	res.send();
});
