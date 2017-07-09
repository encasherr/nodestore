'use strict';
// var compose = require('composable-middleware');

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// var locationsSchema = new Schema({
//   name: String,
//   dial_code: String,
//   code: String
// });

var db = require('../../db');

var locations =  {};

    locations.getAll = function(callback){
      console.log('all returned - db ');
      // console.log(db);
      // var locations = [{name:'Mumbai',id:1},{name:'Pune',id:2}];
      db.query('select * from location', function(err, locations){
          callback(err, locations);
      });
    }

    locations.findById = function(id){
      console.log('find by id called');
      // return 'send resp';
      // console.log('find by id returning ' + obj);
      // return compose().use(function(){
      //   var obj = [{'name':'India'},{'name':'America'}];
      //   obj;
      // });
    }

    locations.create = function(req, callback){
      console.log('create called');
      console.log(req.body);
      db.query('INSERT INTO Location SET ?', req.body, function(err, res){
        if(err) console.log('error occured ' + err);
        console.log('insert id - ' + res.insertId);
      })
    }
// module.exports = mongoose.model('locations', locationsSchema);
module.exports = locations;
