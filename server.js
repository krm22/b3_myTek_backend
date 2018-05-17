//Imports 
var express = require ('express');
var bodyparser = require('body-parser');
var cors = require('cors')

var apiRouter = require('./apiRouter').router;

//Instantiate Server
var server = express();


// initialize body-parser to parse incoming parameters requests to req.body
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

server.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


// Confiqure routes
server.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>You are being served!<h2>');
});



server.use('/api/', apiRouter);

//Launch Server
server.listen(9999,()=>{
    console.log("Server is listening");
});