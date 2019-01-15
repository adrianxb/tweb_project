//Main Server File

const express = require("express");
const app = express();
const morgan= require("morgan");
const cors = require("cors");
const ypi = require("youtube-playlist-info");
const Sequelize = require("sequelize");
const {google} = require('googleapis');
const youtube = google.youtube('v3');
var http = require("http");
var server = http.createServer();
var bodyParser = require('body-parser');
const axios = require('axios');
const CircularJSON = require('circular-json');

var API_KEY = '';
var PLAYLIST_ID = '';
app.use(bodyParser.json());

/*
app.on('request', request);

function request(request, response) {
    var user_data = '';
    request.on('data', function(data)
    {
        user_data += data;
        console.log(data);
    });
    request.on('end', function()
    {  
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end(user_data);
    });
 }
 
app.post('/', function(req, res){

	console.log('Query: '+req);
	res.send('OK');
});

app.post('/credentials',function(req,res){
   console.log('%j', req); 
});
*/


app.post('/credentials',function(req,res){
    console.log('User:');
    API_KEY=req.body.api_key;
    PLAYLIST_ID=req.body.playlist_id;
    console.log(API_KEY);
    console.log(PLAYLIST_ID);
    ypi(API_KEY,PLAYLIST_ID).then(items => {
  for(var i=0;i<items.length;i++)
  {
      (function(){
          var j=i;
          console.log(JSON.stringify(items[j].resourceId));
          sequelize.sync({force:true}).then(function(){
              var instance = Videos.create({
                  title:JSON.stringify(items[j].title),
                  kind: JSON.stringify(items[j].resourceId.kind),
                  videoid: JSON.stringify(items[j].resourceId.videoId),
                  picture: JSON.stringify(items[j].thumbnails.standard.url)
              });
          });
          })();
  }
  res.send('Credentials ok!');
}).catch(console.error);
});



require('dotenv').config();

app.use(morgan('tiny'));
app.use(cors());

app.use('/',express.static(__dirname + '/static'));

const sequelize = new Sequelize('youtube','root','',{
    dialect: "mysql",
    host: "localhost"
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
}).catch(() => {
    console.log("Unable to connect to database");
});

const Videos = sequelize.define('videos', {
    title:{type: Sequelize.STRING,
    field: 'title'},
    kind: {type: Sequelize.STRING,
    field: 'kind'},
    etag: {type: Sequelize.STRING,
    field: 'etag'},
    videoid: {type: Sequelize.STRING,
    field: 'videoid'},
    picture: {type: Sequelize.STRING,
    field: 'picture'}
});

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('Tables created');
    }).catch((err) => {
        console.log(err);
        response.status(200).send('Could not create tables');
    });
});

app.post('/videos', (request, response) => {
    Videos.create(request.body).then((result) => {
  response.status(201).json(result.items);
    }).catch((err) => {
        response.status(500).send("Resource not created");
    });
});

app.get('/videos', (request, response) => {
    Videos.findAll().then((results) => {
        response.status(200).json(results);
    });
});

/*
youtube.playlistItems.list({
  key: 'AIzaSyAHCw3PI-ATrDNSqGs3qx7jLKoSpsq2ShY',
  part: 'contentDetails',
  playlistId: 'PLWhgogf0vWodWqocllMHPT80V779oXrad',
}, (err, results) => {
    if(err){
        console.log(err);
    }
    else{
  for(var i=0;i<results.items.length;i++)
  {

      (function(){
          var j=i;
          console.log(JSON.stringify(results.items[j]));
          sequelize.sync({force:true}).then(function(){
              var instance = Videos.create({
                  kind: JSON.stringify(results.items[j].kind),
                  etag: JSON.stringify(results.items[j].etag),
                  videoid: JSON.stringify(results.items[j].contentDetails.videoId)
              });
          });
          })();
  }
    }
});


app.get('/',(req,res)=>{
    ypi("AIzaSyAHCw3PI-ATrDNSqGs3qx7jLKoSpsq2ShY","PLWhgogf0vWodWqocllMHPT80V779oXrad").then(items => {
  for(var i=0;i<items.length;i++)
  {
      (function(){
          var j=i;
          console.log(JSON.stringify(items[j].resourceId));
          sequelize.sync({force:true}).then(function(){
              var instance = Videos.create({
                  kind: JSON.stringify(items[j].resourceId.kind),
                  videoid: JSON.stringify(items[j].resourceId.videoId)
              });
          });
          })();
  }
}).catch(console.error);
});
*/


app.get('/videos2',(req,res)=>{
    ypi("AIzaSyAHCw3PI-ATrDNSqGs3qx7jLKoSpsq2ShY","PLWhgogf0vWodWqocllMHPT80V779oXrad").then(items => {
 console.log(JSON.stringify(items[0].thumbnails.standard.url));
}).catch(console.error)
})

app.listen(8080);