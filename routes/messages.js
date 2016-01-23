'use strict';


var express = require('express');
var router = express.Router();

var Message = require('../modules/message');

router.post('/', function (req, res) {
  var user = req.body.user;
  Message.findAll(user, function(err, doc) {
    console.log(doc);
    res.status(200).send(doc);
  });
});

router.post('/:data', function (req, res) {
  var searchDate = new Date(req.query.year, req.query.month, req.query.day);
  var author = req.body.user;
  console.log(searchDate);
  Message.find({date: searchDate, author: author}, function(err, doc) {
    if(err) throw err;
    console.log(doc);
    res.status(200).send(doc);
  });
});

module.exports = router;
