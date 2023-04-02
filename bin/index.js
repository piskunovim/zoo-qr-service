const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path')

const serviceStatus = require('./utils/service_status')

const HOST = "localhost";
const PORT = "8080";

mongoose.connect('mongodb://localhost/zoo');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/files', express.static('files'))
app.use('/image', express.static('image'))


const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './image';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const pages = require('./routes/pages')
const management = require('./routes/management')

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/templates/main.html')))

app.use("/pages",pages)


app.use('/management', management)

app.get('/:id', (req, res) => res.sendFile(path.join(__dirname + '/templates/content.html')))

app.post('/image/upload', upload.single('animalImage'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file provided' });
  } else {
    res.status(200).json(req.file.filename);
  }
});


app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
