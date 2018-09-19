const express = require('express');
const apiRouter = require('./routes');
const path = require('path');
const cors = require('cors');
const PORT = 3000;

let clientPath = path.join(__dirname,'../client');
let app = express();

app.use(cors());
app.use(express.json());

app.use('/api',apiRouter);

app.use(express.static(clientPath));








app.listen(PORT);




