'use strict';

var Products = require('./product.model');
var multer = require('multer');

// Get list of Products
exports.index = function(req, res) {
    console.log('products index called');
    var products = Products.getAll(function(err, data){
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

// Get list of active Products
exports.getActive = function(req, res) {
    console.log('products active called');
    Products.getActive(function(err, data){
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

// Get list of active Products by category
exports.getByCategory = function(req, res) {
    console.log('products by category called');
    Products.getByCategory(req, function(err, data){
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

exports.show = function(req, res){
    console.log('product show called');
    Products.show(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    });
}

exports.create = function(req, res) {
  console.log('products create called');
  Products.create(req,function(err, data){
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

exports.upload = function(req, res) {
        upload(req,res,function(err){
        console.log(req.file);
        Products.linkImage(req, function(err){
              if(err){
                  res.json({error_code:1,err_desc:err});
                  return;
              }
              res.json({error_code:0,err_desc:null});
        });
      });
}

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
}).single('file');

function handleError(res, err) {
  console.log('error: ' + err);
  return res.status(500).send(err);
}
