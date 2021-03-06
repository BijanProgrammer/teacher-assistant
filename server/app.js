const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const DATA_FOLDER_PATH = './data/';
const DATABASE_FILE_PATH = './data/database.json';

const app = express();
app.use(cors());
app.use(bodyParser());
app.listen(5000, () => console.log('Listening on port 5000 ...'));

app.get('/tables/:key', (req, res) => {
    fs.readFile(DATA_FOLDER_PATH + req.params.key + '.json', (err, data) => {
        if (err) console.log('ERROR: ', err);
        else res.send(data);
    });
});

app.post('/tables/', (req, res) => {
    fs.writeFile(DATA_FOLDER_PATH + req.params.key + '.json', JSON.stringify(req.body), (err) => {
        if (err) console.log('ERROR: ', err);
        else console.log('Database file has been successfully updated!');
    });

    res.send();
});
