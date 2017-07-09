var db = require('../../db');
var u = require('underscore');

var order = {};

order.create = function(orderObject, callback) {
    console.log('create order item called');
    var s = 'INSERT INTO `order`(`user_id`, `shipping_addressid`, `payment_id`, `status`)';
    s += ' VALUES (' + orderObject.user_id + ',' + orderObject.shipping_address_id;
    s += ',' + orderObject.payment_id + ',"' + orderObject.status + '")'; 
    var q = db.query(s, function(err, result) {
        if(err) {
            console.log('error occured in insert ' + err);
            callback(err, result);
        }
        var orderId = result.insertId;
        console.log('insert id - ' + orderId);
        db.query('select * from `order` where id=' + orderId, function(err1, orderResult) {
            callback(err1, orderResult[0]);
        });
    });

    console.log('order sql - ' + q.sql);
}

order.show = function(orderId, callback) {
    console.log('order show query called');
    var query = getOrderRetrievalQuery();
    query += ' where o.id=?';
    db.query(query,orderId, function(err, orderItem) {
        if(err) {
            console.log('error occured in select - ' + err);
            callback(err, null);
        }
        else {
            callback(null, orderItem[0]);
        }
    });
}

order.getPending = function(callback) {
    console.log('order pending query called');
    var query = getOrderRetrievalQuery();
    query += ' where o.status="created" order by o.id';
    var q = db.query(query, function(err, orderItems) {
        if(err) {
            console.log('error occured in select - ' + err);
            callback(err, null);
        }
        else {
            console.log('product orders returned from db - ' + orderItems.length);
            if(orderItems.length > 0) {
                var orderWiseData = [];
                u.chain(orderItems)
                 .groupBy("order_id")
                 .map(function(value, key) {
                     var order_item = {};
                     order_item.order_id = key;
                     order_item.order_date = value[0].order_date;
                     order_item.status = value[0].status;
                     order_item.shipping_for = value[0].shipping_for;
                     order_item.shipping_city = value[0].shipping_city;
                     order_item.shipping_address = value[0].shipping_address;
                     order_item.shipping_landmark = value[0].shipping_landmark;
                     order_item.shipping_pincode = value[0].shipping_pincode;
                     order_item.shipping_state = value[0].shipping_state;
                     order_item.shipping_country = value[0].shipping_country;
                     order_item.shipping_phone = value[0].shipping_phone;
                     order_item.products = [];
                     var totalAmount = 0;
                     u.each(value, function(item) {
                         var productItem = {};
                         productItem.title = item.product_title;
                         productItem.price = item.product_price;
                         productItem.shipping_price = item.shipping_amount;
                         
                         totalAmount += item.product_price;
                         totalAmount += item.shipping_amount;
                         
                         order_item.products.push(productItem);
                     });
                     order_item.amount_paid = totalAmount;
                     orderWiseData.push(order_item);
                 });
                callback(null, orderWiseData);
            }
        }
    });

    console.log('select query - ' + q.sql);
}

var getOrderRetrievalQuery = function(){
    var sql = 'select p.title as product_title, order_time as order_date, o.status, uc.product_price, uc.shipping_amount, uc.order_id, sa.name as shipping_for, sa.city as shipping_city,';
    sql += ' sa.address as shipping_address, sa.landmark as shipping_landmark, sa.pincode as shipping_pincode, sa.state as shipping_state,';
    sql += ' sa.country as shipping_country,sa.phone as shipping_phone';
    sql += ' from `order` o join user_cart uc on o.id=uc.order_id join user u on uc.user_id = u.user_id join product p on uc.product_id=p.id';
    sql += ' join shipping_address sa on o.shipping_addressid=sa.id'; 
    
    // var sql = 'select * from `order` o';
    
    return sql;
}

module.exports = order;