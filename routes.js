/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var config  = require('./config/environment');

module.exports = function(app) {
  app.use(function(req,res,next){
    console.log('client domain - ' + config.clientDomain);
    res.header("Access-Control-Allow-Origin", config.clientDomain);
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header("Access-Control-Allow-Credentials", true);
    next();
  })

  // Insert routes below
     app.use('/api/locations', require('./api/location'));
     app.use('/api/shippings', require('./api/shipping'));
//   app.use('/api/coupons', require('./api/coupon'));
     app.use('/api/features', require('./api/feature'));
     app.use('/api/specs', require('./api/productspec'));
     app.use('/api/reviews', require('./api/review'));
//   app.use('/api/PaymentMethods', require('./api/PaymentMethod'));
//   app.use('/api/settings', require('./api/setting'));
//   app.use('/api/dashboard', require('./api/dashboard'));
     app.use('/api/cart', require('./api/cart'));
//   app.use('/api/invoices', require('./api/invoice'));
//   app.use('/api/shop', require('./api/shop'));
//   app.use('/api/brands', require('./api/brand'));
     app.use('/api/categories', require('./api/category'));
     app.use('/api/orders', require('./api/order'));
     app.use('/api/products', require('./api/product'));
//   app.use('/api/things', require('./api/thing'));
     app.use('/api/users', require('./api/user'));
     app.use('/api/payment', require('./api/payment'));

     app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  // All other routes should redirect to the index.html
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendFile(path.resolve(app.get('appPath') + '/views/home.html'));
  //   });
};
