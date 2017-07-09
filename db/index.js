'use strict';

var config  = require('../config/environment');
var mysql = require('mysql');

// var connection = mysql.createConnection(process.env.OPENSHIFT_MYSQL_DB_URL + 'nodestore');
var connection = mysql.createConnection(config.mysql.connectionString);
    console.log('db connecting to - ' + config.mysql.connectionString);
if(process.env === 'production'){
    console.log('db connecting to - ' + config.mysql.connectionString);
    connection.connect(function(err) {
        if (err) throw err;
        console.log('db connected');
    });
}
else if(process.env === 'development'){
    connection = mysql.createConnection(config.mysql);
    console.log('db connecting to - ' + config.mysql.host);
    connection.connect(function(err) {
        if (err) throw err;
        console.log('db connected');
    });
}

module.exports = connection;
