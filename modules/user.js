'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
    email: {
        type: String
    },
    pass: {
        type: String
    },
    registreted: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    meessages_id: {
        type: Array
    }
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {

    bcrypt.hash(newUser.pass, 8, function(err, hash) {
        if (err) throw err;

        newUser.pass = hash;
        //Create User
        newUser.save(callback);
    });
};

module.exports.comparePassword = function(pass, pass2, callback) {
    bcrypt.compare(pass, pass2, callback);
};

module.exports.updateMessage = function (data, callback) {
  var user = data.author;
  User.update({email: user}, {$push: {meessages_id: data._id}}, callback);
};

