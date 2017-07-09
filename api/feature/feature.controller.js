'use strict';

var Features = require('./feature.model');


// Get list of product Features
exports.show = function(req, res) {
    console.log('features show called');
    var features = Features.show(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    });
};


// Create feature
exports.create = function(req, res) {
    console.log('features create called');
    var features = Features.create(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
