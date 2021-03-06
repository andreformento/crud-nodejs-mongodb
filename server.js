const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
// const db = require('./config/db');
const mongodb = require('mongodb'); //mongo connection
const MongoClient = mongodb.MongoClient;
const ObjectID = require("mongodb").ObjectID;
const app = express();

const DB_ADDR = process.env.DB_ADDR || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_CONNECTION = 'mongodb://' + DB_ADDR + ':' + DB_PORT + '/nodejsmongodb';
var db;

console.log('v8', DB_CONNECTION);

// DATABASE
MongoClient.connect(DB_CONNECTION, (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(3000, () => {
		console.log('listening on 3000');
	});
});

// Template engine
app.set('view engine', 'ejs');

// handlers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		// renders index.ejs
		res.render('index.ejs', {quotes: result});
	});
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  });
})

app.delete('/quotes/:quoteId', (req, res) => {
  const quoteId = req.params.quoteId
  db.collection('quotes').deleteOne({_id : ObjectID(quoteId)}, (err, result) => {
    if (err) return console.log(err)
    console.log('delete from database')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'subs'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err);
	res.redirect('/');
  })
});
