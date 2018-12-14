const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fs = require('fs');

// serve static assets normally
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/greetings', function(req, res){
  res.send('Hello, world!')
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/hackathons/*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(3000,function(){
  console.log("Started on PORT 3000");
});
