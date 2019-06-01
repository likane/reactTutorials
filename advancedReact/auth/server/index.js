//main starting point of the application
// node index.js to start server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//db setup
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
//app setup
app.use(morgan('combined')); //logging incoming requests
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);


//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on: ' + port);
