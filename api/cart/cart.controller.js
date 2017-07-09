'use strict';

var Cart = require('./cart.model');


// Get list of user cart items
exports.show = function(req, res) {
    console.log('user cart show called - ');
    var userId = req.user.user_id;
    Cart.show(userId, function(err, data){
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

// Create cart item
exports.create = function(req, res) {
    console.log('cart create called for user id - ' + req.user.user_id + '-' + req.body);
    var cartObject = {};
    cartObject.user_id = req.user.user_id;
    cartObject.product_id = req.body.id;
    cartObject.quantity = req.body.quantity;
    cartObject.product_price = req.body.price;
    cartObject.shipping_amount = req.body.shippingCharge;
    cartObject.status = 'Added'; 
    
    Cart.create(cartObject, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    });
}

exports.destroy = function(req, res) {
    console.log('cart remove called for user_cart id - ' + req.body.user_cart_id);
    Cart.destroy(req,  function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          return(res.json(data));
    })
}