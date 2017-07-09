var db = require('../../db');

var shippings = {};

shippings.getAllShippingAddress = function(req, callback){
    console.log('shipping addresses to be fetched');
    var retrieveShippingsSql = getRetrieveShippingsSql();
    retrieveShippingsSql += ' where user_id = ?'
    db.query(retrieveShippingsSql,req.params.userid, function(err, shippings){
        console.log('db shippings - ' + shippings.length);
        callback(err, shippings);
    })
    
}

shippings.create = function(req, callback){
    console.log('shipping address create called');
    db.query('INSERT INTO shipping_address SET ?', req.body, function(err, res){
        if(err) console.log('error occured in insert ' + err);
        console.log('insert id - ' + res.insertId);
        db.query('select * from shipping_address where id = ?',res.insertId, function(err, shippings){
            console.log('db shippings - ' + shippings.length);
            callback(err, shippings);
        })        
    })
}

var getRetrieveShippingsSql = function(){
    var sql = 'select *';
        sql += ' from shipping_address sa';
    return sql; 
}

module.exports = shippings;
