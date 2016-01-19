var express = require('express');
var router = express.Router();
var Message = require('../modules/message');
var User = require('../modules/user');

router.post('/create', function (req, res) {

  var newMessage = new Message({
    subject: req.body.subject,
    message: req.body.message,
    date: req.body.date,
    author: req.body.user
  });

  Message.createMessage(newMessage, function(err, data) {
    if (err) throw error;

    User.updateMessage(data, function (err, data) {
      if (err) throw error;

      res.status(200).send({message: 'added'});
    })
  })

})

module.exports = router;
