var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  subject: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  author: {
    type: String
  }

});
var Message = module.exports = mongoose.model('Message', MessageSchema);


module.exports.createMessage = function (newMessage, callback) {
  newMessage.save(callback);
}
module.exports.findAll = function (user, callback) {
  Message.aggregate([{$match: {author: user}},{$group: {_id: "$date", num_prod: {$sum: 1}}}, {$sort: {date: 1}}], callback);
}
