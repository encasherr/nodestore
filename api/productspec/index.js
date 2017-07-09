'use strict';

var express = require('express');
var controller = require('./productspec.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/:productid', controller.getSpecifications);
router.post('/', controller.create);

module.exports = router;