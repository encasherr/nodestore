'use strict'

var db = require('../../db');
var u = require('underscore');

var productspecs =  {};

productspecs.getSpecifications = function(req, callback){
    console.log('product specs returned ' + req.params.productid);
    var sql = productSpecRetrieveSql();
        sql += ' where ps.product_id=?';
    var q = db.query(sql,req.params.productid, function(err, productspecs){
        
        console.log(q.sql);
        callback(err, productspecs);
    });
}

productspecs.create = function(req, callback){
    console.log('product spec create called');
    db.query('INSERT INTO product_spec SET ?', req.body, function(err,res){
        if(err) console.log('error occured in insert ' + err);
        if(res)
        {
            console.log('insert id - ' + res.insertId);
        }
        else
        {
            console.log('could not insert spec');
        }
        db.query('select * from product_spec where id = ?', res.insertId, function(err1,res1){
            if(err1) console.log('error occured in select ' + err1);
            if(res1 && res1.length > 0)
            { 
                console.log('records returned - ' + res1.length);
                callback(err1, res1);
            }
        })
    })
}

var productSpecRetrieveSql = function(){
        var sql = 'select * from product_spec ps'; 
        return sql;

}
module.exports = productspecs;
