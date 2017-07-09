'use strict';

var express = require('express');
var controller = require('./cart.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/my', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:ucid', auth.isAuthenticated(), controller.destroy);

module.exports = router;