'use strict';

var express = require('express');
var controller = require('./product.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/active', auth.isAuthenticated(), controller.getActive);
router.get('/:productid', auth.isAuthenticated(), controller.show);
router.get('/category/:categoryid', controller.getByCategory);
router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
router.post('/upload', controller.upload);

module.exports = router;