var express = require('express');
var controller = require('./payment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/paypal/pay', auth.isAuthenticated(), controller.pay_with_paypal);
router.post('/paypal/execute', auth.isAuthenticated(), controller.execute_payment);
router.get('/paypal/cancel',  controller.cancel_payment);

module.exports = router;
