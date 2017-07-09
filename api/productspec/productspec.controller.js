'use strict';

var ProductSpecs = require('./productspec.model');

// Get list of Product Specs
exports.index = function(req, res) {
    console.log('product spec index called');
    ProductSpecs.getAll(function(err, data){
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

// Get list of Specifications by productid
exports.getSpecifications = function(req, res) {
    console.log('product specs by id called');
    ProductSpecs.getSpecifications(req, function(err, data){
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

exports.create = function(req, res) {
  console.log('product spec create called');
  ProductSpecs.create(req,function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    });
}

function handleError(res, err) {
  console.log('error: ' + err);
  return res.status(500).send(err);
}
