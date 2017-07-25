const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const planetRoute = require('./planets');

app.use(cors());
app.use(bodyParser.json());

app.use("/planets", planetRoute);

app.listen(8080);