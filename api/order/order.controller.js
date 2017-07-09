'use strict';

var Orders = require('./order.model');

exports.show = function(req, res) {
    console.log('order show called - ');
    var orderId = req.params.orderid;

    Orders.show(orderId, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data -id: ' + data.id);
          return(res.json(data));
    });
}

exports.getPending = function(req, res) {
    console.log('pending orders show called');

    Orders.getPending(function(err, data) {
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - length ' + data.length);
          return(res.json(data));
    })
}

function handleError(res, err) {
  console.log('error: ' + err);
  return res.status(500).send(err);
}