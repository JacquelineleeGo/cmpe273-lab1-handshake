require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public')); 
app.use("/api", router);

app.listen(process.env.APP_PORT, () => console.log(`Running on localhost:${process.env.APP_PORT}`));