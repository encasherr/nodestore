var db = require('../../db');
var u = require('underscore');

var cart =  {};

cart.show = function(userId, callback){
    console.log('cart items returned for userid -' + userId);
    var retrieveCartSql = getRetrieveCartSql();
    retrieveCartSql += ' where uc.user_id = ? and uc.status="Added"';
    db.query(retrieveCartSql, userId, function(err, cartItems){
        if(err) {
            console.log('error occured - ' + err);
            callback(err, cartItems);
        }
        else{
            var productWiseData = [];
            u.chain(cartItems)
            .groupBy("product_id")
            .map(function(value, key){
                var product = {};
                product.uc_id = value[0].uc_id;
                product.id = value[0].product_id;
                product.title = value[0].title;
                product.quantity = value[0].quantity;
                product.shippingCharge = 0;
                u.each(value, function(item){
                    product[item.meta_key] = item.meta_value;
                });
                productWiseData.push(product);
            })
            console.log('db cartItems - ' + productWiseData.length);
            callback(err, productWiseData);
        }
    });
}

cart.create = function(cartObject, callback){
    console.log('cart item create called');
    db.query('INSERT INTO user_cart SET ?', cartObject, function(err,res){
        if(err) console.log('error occured in insert ' + err);
        console.log('insert id - ' + res.insertId);
        callback(err, res);
    })
}

cart.destroy = function(req, callback) {
    console.log('cart item remove called');
    var q = db.query('delete from user_cart where id=?',[
                                                req.params.ucid
    ], function(err,res) {
                                    if(err) console.log('error occured in delete ' + err);
                                    callback(err,res);
                                });
    console.log('delete query - ' + q.sql);
}

cart.update = function(userId, orderId, callback) {
    console.log('cart updates called for order id - ' + orderId);
    cart.show(userId, function(err, items) {
        var cartIds = '(0,';
        items.forEach(function(element) {
            cartIds += element.uc_id + ',';
        }, this);

        cartIds = cartIds.slice(0,-1);
        cartIds += ')';
        var s = 'update user_cart uc set uc.status="ordered", uc.order_id=' + orderId + ' where uc.id in ' + cartIds ;
        var q = db.query(s, function(err, result) {
            if(err) {
                console.log('error in bulk update - ' + err);
                callback(err, null);
            }
            else {
                console.log('cart updated successfully - ' + result.affectedRows);
                callback(null, result);
            }
        });
        console.log('updt query - ' + q.sql);
    });
    
}

var getRetrieveCartSql = function(){
    
    var sql = 'select uc.id as uc_id, p.id as product_id,p.title as title,p.description as description,';
        sql += ' pm.* from product p join product_meta pm on p.id=pm.product_id';
        sql += ' join user_cart uc on uc.product_id=p.id'; 
    return sql;
}

module.exports = cart;
