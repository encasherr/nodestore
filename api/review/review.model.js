var db = require('../../db');

var reviews = {};


reviews.getAllReviews = function(req, callback){
    console.log('review for product to be fetched');
    var retrieveReviewsSql = getRetrieveReviewsSql();
    retrieveReviewsSql += ' where product_id = ?'
    db.query(retrieveReviewsSql,req.params.productid, function(err, reviews){
        console.log('db reviews - ' + reviews.length);
        callback(err, reviews);
    })
}

reviews.create = function(req, callback){
    console.log('review model create called');
    db.query('INSERT INTO product_review SET ?', req.body, function(err, res){
        if(err) console.log('error occured in insert ' + err);
        console.log('insert id - ' + res.insertId);
        db.query('select * from product_review where id = ?',res.insertId, function(err, reviews){
            console.log('db reviews - ' + reviews.length);
            callback(err, reviews);
        })        
    })
}

var getRetrieveReviewsSql = function(){
    var sql = 'select pr.title,pr.description,u.username as "reviewed_by",';
        sql += ' pr.review_time as "reviewed_on", pr.rating';
        sql += ' from product_review pr join user u on pr.reviewed_by=u.user_id';
    return sql; 
}

module.exports = reviews;
