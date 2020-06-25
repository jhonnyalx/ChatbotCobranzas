const express = require('express');
var rutas=require('./routes/routes');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/assistant",rutas)
module.exports = app;