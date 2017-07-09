var db = require('../../db');
var u = require('underscore');

var categories =  {};


categories.getAll = function(callback){
    db.query('select * from category', function(err, categories){
        for(var cat in categories){
            var parentItem = u.findWhere(categories,{id: categories[cat].parent_category_id});
            if(parentItem){
                categories[cat].parent = parentItem.title;
            }
        }
        callback(err, categories);
    });
}

categories.create = function(req, callback){
    console.log('category create called');
    db.query('INSERT INTO category SET ?', req.body, function(err,res){
        if(err) console.log('error occured in insert ' + err);
        console.log('insert id - ' + res.insertId);
        db.query('select * from category where id = ?', res.insertId, function(err1,res1){
            if(err1) console.log('error occured in select ' + err1);
            console.log('records returned - ' + res1.length);
            callback(err1, res1);
        })
    })
}

categories.update = function(req, callback){
    console.log('category update called');
    console.log(req.body);
    var q = db.query('update category SET ? where ?',
             [{
                 title: req.body.title,
                 description: req.body.description,
                 parent_category_id: req.body.parent_category_id,
                 update_date_time: new Date()
             },
             {
                 id: req.body.id
             }], function(err, res){
        if(err) console.log('error occured in update ' + err);
        console.log('Updated ' + res.changedRows + ' categories');
    })
}

categories.destroy = function(req, callback){
    console.log('category delete called');
    console.log(req.body);
    var q = db.query('delete from category where ?',
             [
                {
                    id: req.params.id
                }
             ], function(err, res){
        if(err) console.log('error occured in delete ' + err);
        console.log('Deleted ' + res.changedRows + ' categories');
    })
}

module.exports = categories;
