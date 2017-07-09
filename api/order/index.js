'use strict';

var express = require('express');
var controller = require('./order.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/pending', auth.isAuthenticated(), controller.getPending);
router.get('/:orderid', auth.isAuthenticated(), controller.show);
// router.get('/getall', auth.isAuthenticated(), controller.getAll);
// router.get('/completed', auth.isAuthenticated(), controller.getCompleted);
// router.get('/my', auth.isAuthenticated(), controller.getMy);

module.exports = router;