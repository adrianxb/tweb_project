//Main Server File

const express = require("express");
const app = express();
const morgan= require("morgan");
const cors = require("cors");
const ypi = require("youtube-playlist-info");
const Sequelize = require("sequelize");
const google = require('googleapis');
const youtube = google.youtube('v3');

require('dotenv').config();

app.use(morgan('tiny'));
app.use(cors());

app.use('/',express.static(__dirname + '/static'));

const sequelize = new Sequelize('youtube','root','',{
    dialect: "mysql",
    host: "localhost"
    
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const Videos = sequelize.define('videos', {
    kind: {type: Sequelize.STRING,
    field: 'kind'},
    etag: {type: Sequelize.STRING,
    field: 'etag'},
    videoid: {type: Sequelize.STRING,
    field: 'videoid'}
})

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('Tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('Could not create tables')
    })
})

app.post('/videos', (request, response) => {
    Videos.create(request.body).then((result) => {
  response.status(201).json(result.items)
    }).catch((err) => {
        response.status(500).send("Resource not created")
    })
})

app.get('/videos', (request, response) => {
    Videos.findAll().then((results) => {
        response.status(200).json(results)
    })
})

youtube.playlistItems.list({
  key: 'AIzaSyAHCw3PI-ATrDNSqGs3qx7jLKoSpsq2ShY',
  part: 'contentDetails',
  playlistId: 'PLWhgogf0vWodWqocllMHPT80V779oXrad',
  maxResult: 10,
}, (err, results) => {
  for(var i=0;i<results.items.length;i++)
  {
      (function(){
          var j=i
          console.log(JSON.stringify(results.items[j]))
          sequelize.sync({force:true}).then(function(){
              var instance = Videos.create({
                  kind: JSON.stringify(results.items[j].kind),
                  //etag: JSON.stringify(results.items[j].etag),
                  videoid: JSON.stringify(results.items[j].contentDetails.videoId)
              })
          })
          })()
  }
})

app.get('/videos2',(req,res)=>{
    ypi("AIzaSyAHCw3PI-ATrDNSqGs3qx7jLKoSpsq2ShY","PLWhgogf0vWodWqocllMHPT80V779oXrad").then(items => {
  res.json(items);
}).catch(console.error)
})



app.listen(8080);