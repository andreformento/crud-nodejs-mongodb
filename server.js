const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./config/db');
const mongodb = require('mongodb'); //mongo connection
const MongoClient = mongodb.MongoClient;
const app = express();

var db;

// DATABASE
MongoClient.connect('mongodb://localhost/nodejsmongodb', (err, database) => {
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

// routes
app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		// renders index.ejs
		res.render('index.ejs', {quotes: result});
	});
});

app.post('/quotes', (req, res) => {
  console.log(req.body);

  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  });
});
