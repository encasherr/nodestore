var express = require("express");
var controller = require("./shipping.controller");

var router = express.Router();

router.get('/:userid', controller.getAllShippingAddress);
router.post('/', controller.create);

module.exports = router;
