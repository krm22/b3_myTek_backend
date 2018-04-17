//Imports 
var express = require ('express');
var bodyparser = require('body-parser');
var apiRouter = require('./apiRouter').router;

//Instantiate Server
var server = express();

//Body-parser configuration
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

// Confiqure routes
server.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>You are being served!<h2>');
});

server.use('/api/', apiRouter);

//Launch Server
server.listen(9999,()=>{
    console.log("Server is listening");
})