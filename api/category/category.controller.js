'use strict';

var Categories = require('./category.model');


// Get list of Categories
exports.index = function(req, res) {
    console.log('categories index called');
    var categories = Categories.getAll(function(err, data){
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

// Create category
exports.create = function(req, res) {
    console.log('categories create called');
    var categories = Categories.create(req, function(err, data){
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

//update category
exports.update = function(req, res){
    console.log('category update called');
    Categories.update(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    })
}

//delete category
exports.destroy = function(req, res){
    console.log('category delete called');
    Categories.destroy(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    })
}

function handleError(res, err) {
  return res.status(500).send(err);
}
