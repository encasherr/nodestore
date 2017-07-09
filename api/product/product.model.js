'use strict'

var db = require('../../db');
var u = require('underscore');

var Reviews = require('../review/review.model');


var products =  {};


products.getAll = function(callback){
    console.log('all products returned - db ');
    var sql = productRetrieveSql();
    db.query(sql, function(err, products){
        var productWiseData = [];
        u.chain(products)
         .groupBy("product_id")
         .map(function(value, key){
             var product_item = {};
             product_item.id = value[0].product_id;
             product_item.title = value[0].title;
             product_item.description = value[0].description;
             product_item.category = value[0].category;
             product_item.shippingCharge = 0;
             u.each(value, function(item){
                 product_item[item.meta_key] = item.meta_value;
             });
             productWiseData.push(product_item);
         })
        callback(err, productWiseData);
    });
}

products.getActive = function(callback){
    console.log('all products returned - db ');
    var sql = productRetrieveSql();
        sql += ' where p.status="published"'; 
    db.query(sql,'published', function(err, products){
        var productWiseData = [];
        u.chain(products)
         .groupBy("product_id")
         .map(function(value, key){
             var product_item = {};
             product_item.id = value[0].product_id;
             product_item.title = value[0].title;
             product_item.description = value[0].description;
             product_item.category = value[0].category;
             product_item.shippingCharge = 0;
             u.each(value, function(item){
                 product_item[item.meta_key] = item.meta_value;
             });
             productWiseData.push(product_item);
         })
        callback(err, productWiseData);
    });
}

products.getByCategory = function(req, callback){
    console.log('category products returned ' + req.params.categoryid);
    var sql = productRetrieveSql();
        sql += ' where p.status="published" and p.category_id!=0 and p.category_id=?';
    var q = db.query(sql,req.params.categoryid, function(err, products){
        var productWiseData = [];
        u.chain(products)
         .groupBy("product_id")
         .map(function(value, key){
             var product_item = {};
             product_item.id = value[0].product_id;
             product_item.title = value[0].title;
             product_item.description = value[0].description;
             product_item.category = value[0].category;
             product_item.shippingCharge = 0;
             u.each(value, function(item){
                 product_item[item.meta_key] = item.meta_value;
             });
             productWiseData.push(product_item);
         })
         console.log(q.sql);
        callback(err, productWiseData);
    });
}

products.show = function(req, callback){
    console.log('single product returned - db ');
    var sql = productRetrieveSql();
    sql += ' where p.id=?';
    db.query(sql,req.params.productid, function(err, products){
        var product = {};
        Reviews.getAllReviews(req,function(err, reviews){
            product.reviews = reviews;
            u.chain(products)
            .groupBy("product_id")
            .map(function(value, key){
                product.id = value[0].product_id;
                product.title = value[0].title;
                product.description = value[0].description;
                product.category = value[0].category;
                product.shippingCharge = 0;
                u.each(value, function(item){
                    product[item.meta_key] = item.meta_value;
                });
            })
         callback(err, product);
        });
    });
}

products.create = function(req, callback){
    console.log('product create called');
    var basicInfoAttributes = [];
    basicInfoAttributes.push('title');
    basicInfoAttributes.push('description');
    basicInfoAttributes.push('category_id');
    var metaAttributes = [];
    metaAttributes.push('sell_price');
    metaAttributes.push('stock_quantity');
    var productOptions = req.body.options;


    var basicInfo = {};
    var attributes = [];

    for(var prop in req.body){

        if(u.contains(basicInfoAttributes,prop)){
            basicInfo[prop] = req.body[prop];
        }
        
        if(u.contains(metaAttributes,prop)){
            attributes.push({
                'meta_key': prop,
                'meta_value': req.body[prop]
            });
        }
    }

    db.query('INSERT INTO product SET ?', basicInfo, function(err,res){
        if(err) console.log('error occured in insert ' + err);
        var productId = res.insertId;
        console.log('insert id - ' + productId);

        for(var index in attributes){
            attributes[index].product_id = productId;
            console.log('adding meta for ' + attributes[index].meta_key);
            AddToProductMeta(attributes[index],function(err1){
                if(err1) console.log('error occured in product_meta ' + err1);
                
            });
        }

        if(productOptions){
            console.log('p1 - ' + productOptions[0].label)
            AddToProductOptions(productOptions, productId);
        }

        db.query('select * from product where id = ?', res.insertId, function(err1,res1){
            if(err1) console.log('error occured in select ' + err1);
            console.log('records returned - ' + res1.length);
            callback(err1, res1);
        })
    })
}

products.linkImage = function(req, callback){
    console.log('product image upload called');
    var attribute = {};
    attribute.meta_key = 'img_url';
    attribute.meta_value = 'uploads/' + req.file.filename;
    attribute.product_id = req.body.product_id;
    AddToProductMeta(attribute, callback);
}

var AddToProductMeta = function(meta_attribute, callback){
    db.query('INSERT INTO product_meta SET ?', meta_attribute, function(err, res){
                if(err) console.log('error occured in product_meta ' + err);
                callback(err);
            })
}

var AddToProductOptions = function(productOptions, product_id){
    for(var option in productOptions){
        var prod_option = productOptions[option];
            console.log('option adding - ' + prod_option.label);
        var optionToAdd = {};
        optionToAdd.product_id = product_id;
        optionToAdd.option_type = prod_option.type;
        optionToAdd.option_label = prod_option.label;
        optionToAdd.option_values = prod_option.options;
        db.query('INSERT INTO product_option SET ?', optionToAdd, function(err, res){
                if(err) console.log('error occured in product_option ' + err);
        })
    }
}

var productRetrieveSql = function(){
        var sql = 'select p.id as product_id,p.title as title,p.description as description,c.title as category,';
            sql += ' pm.* from product p join product_meta pm on p.id=pm.product_id'; 
            sql += ' join category c on (p.category_id=c.id or p.category_id=c.parent_category_id)';
        return sql;

}
module.exports = products;
