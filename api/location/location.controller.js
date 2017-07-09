'use strict';

var _ = require('lodash');
var Locations = require('./location.model');


// Get list of Locationss
exports.index = function(req, res) {
console.log('index called');
    var locations = Locations.getAll(function(err, data){
          if(err) { 
            return handleError(data, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    });
};


// Get a single Location
exports.show = function(req, res) {
console.log('show called');
  // Locations.findById(req.params.id, function (err, Locations) {
    var locations = Locations.getAll(function(err, data){
          if(err) { 
            return handleError(data, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    });
      
};

// Creates a new Location in the DB.
exports.create = function(req, res) {
console.log('create service called');
console.log(req.body);
Locations.create(req,function(err, data){
          if(err) { 
            return handleError(data, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    });
  // Locations.create(req.body, function(err, data) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(201).json(Locations);
  // });
};

// Updates an existing Locations in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Locations.findById(req.params.id, function (err, Locations) {
//     if (err) { return handleError(res, err); }
//     if(!Locations) { return res.status(404).send('Not Found'); }
//     var updated = _.extend(Locations, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(Locations);
//     });
//   });
// };

// // Deletes a Locations from the DB.
// exports.destroy = function(req, res) {
//   Locations.findById(req.params.id, function (err, Locations) {
//     if(err) { return handleError(res, err); }
//     if(!Locations) { return res.status(404).send('Not Found'); }
//     Locations.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.status(204).send('No Content');
//     });
//   });
// };

function handleError(res, err) {
  return res.status(500).send(err);
}
