const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const serviceStatus = require('./utils/service_status')

const HOST = "localhost";
const PORT = "8080";

mongoose.connect('mongodb://localhost/zoo');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/files', express.static('files'))

const pages = require('./routes/pages')
const management = require('./routes/management')

app.get('/', serviceStatus())
app.use("/pages",pages)

app.use('/management', management)

app.listen(PORT, HOST)

console.log(`Running on http://${HOST}:${PORT}`)
