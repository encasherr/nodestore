'use strict';

var db = require('../../db');

var payment_model = {};

payment_model.insertPayment = function(data, callback) {

    db.query('INSERT INTO payment SET ?', data, function(err, res){
        if(err) {
            console.log('error occured in insert payment - ' + err);
        }
        else{
            console.log('payment inserted id - ' + res.insertId);
            callback(err, res);
        }
    })

}

module.exports = payment_model;