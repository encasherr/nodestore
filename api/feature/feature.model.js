var db = require('../../db');

var features =  {};

features.show = function(req, callback){
    console.log('all features returned');
    db.query('select * from product_feature where product_id= ?',req.params.productid, function(err, features){
        console.log('db features - ' + features.length);
        callback(err, features);
    });
}

features.create = function(req, callback){
    console.log('feature create called');
    db.query('INSERT INTO product_feature SET ?', req.body, function(err,res){
        if(err) console.log('error occured in insert ' + err);
        console.log('insert id - ' + res.insertId);
        db.query('select * from product_feature where id = ?', res.insertId, function(err1,res1){
            if(err1) console.log('error occured in select ' + err1);
            console.log('records returned - ' + res1.length);
            callback(err1, res1);
        })
    })
}

module.exports = features;
