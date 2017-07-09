var Shippings = require('./shipping.model');

exports.getAllShippingAddress = function(req, res){
    console.log('shipping get called');
    Shippings.getAllShippingAddress(req, function(err, data){
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

exports.create = function(req, res){
    console.log('shipping address create called');
    Shippings.create(req, function(err, data){
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
  return res.status(500).send(err);
}
