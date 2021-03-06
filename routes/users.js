'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../modules/user');
var jwt = require('jwt-simple');



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
      res.status(401).send('login in pls');
}

function isAdmin(req, res, next) {

  console.log(req.user);
  if (req.user.admin === true) {
    console.log("admin");
    return next();
  } 
    console.log("not admin");
  res.status(401).send('login in pls'); 
}

function createToken(user, res) {
  var payload = {
    sub: user.id
  };
  var token = jwt.encode(payload, 'secret');
  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}


//pasport authorization*****************

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

var registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pass'
  },
  function(username, password, done) {

    User.findOne({email: username}, function(err, doc) {
        if (err) {
          return done(err);
        }

      if (doc) {
          return done(null, false, {message: 'current user are allready in'});

      } else {

        // TODO  Create sever user validation user

        var newUser = new User({
          email : username,
          pass : password,
          admin: false,
        });

        User.createUser(newUser, function (err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        });
      }
    });
  }
);


var loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pass'
  },
  function(username, password, done){
    User.findOne({'email': username}, function (err, user) {
      if(err) return done(err);

      if(!user){
        console.log('Unknown user');
        return done(null, false, {message: 'Wrong email/password'});
      }
      User.comparePassword(password, user.pass, function(err, isMatch){
        if(err) return done(err);

        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }
);

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

router.post('/register', passport.authenticate('local-register'), function(req, res) {
  createToken(req.user, res);
});

router.post('/login', passport.authenticate('local-login'), function (req, res) {
  createToken(req.user, res);
});


router.get('/help', isAdmin, function (req, res) {
  var faq = {
    title: 'Only Admin can see that page',
    body: 'Endeavor bachelor but add eat pleasure doubtful sociable. Age forming covered you entered the examine. Blessing scarcely confined her contempt wondered shy. Dashwoods contented sportsmen at up no convinced cordially affection. Am so continued resembled frankness disposing engrossed dashwoods. Earnest greater on no observe fortune norland. Hunted mrs ham wishes stairs. Continued he as so breakfast shameless. All men drew its post knew. Of talking of calling however civilly wishing resolve. '+
    'Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited. Enquire ye without it garrets up himself. Interest our nor received followed was. Cultivated an up solicitude mr unpleasant. '
  };

	res.send(faq);

});


router.get('/logout', function(req, res){
  req.logout();
  res.send({message: 'You have logged out'});
});

module.exports = router;