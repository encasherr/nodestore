var express = require("express");
var controller = require("./review.controller");

var router = express.Router();

router.get('/:productid', controller.getAllReviews);
router.post('/', controller.create);

module.exports = router;
