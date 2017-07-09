'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log('auth called - 1 ' + req.body.email);
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error){
       console.log('error occured to authenticate - ' + info.message);
       return res.status(401).json(error);
    }
    if (!user){
       console.log('user not found to authenticate');
       return res.status(404).json({message: 'Something went wrong, please try again.'});
    }


    var token = auth.signToken(user.user_id, 'admin');
    console.log('user found - ' + token);
    res.json({token: token});
  })(req, res, next)
});

module.exports = router;