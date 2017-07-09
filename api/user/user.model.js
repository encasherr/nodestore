'use strict';

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

// var UserSchema = new Schema({
//   name: String,
//   email: { type: String, lowercase: true },
//   role: {
//     type: String,
//     default: 'user'
//   },
//   hashedPassword: String,
//   provider: String,
//   salt: String,
//   facebook: {},
//   twitter: {},
//   google: {},
//   github: {}
// });

// /**
//  * Virtuals
//  */
// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// // Public profile information
// UserSchema
//   .virtual('profile')
//   .get(function() {
//     return {
//       'name': this.name,
//       'role': this.role
//     };
//   });

// // Non-sensitive info we'll be putting in the token
// UserSchema
//   .virtual('token')
//   .get(function() {
//     return {
//       '_id': this._id,
//       'role': this.role
//     };
//   });

// /**
//  * Validations
//  */

// // Validate empty email
// UserSchema
//   .path('email')
//   .validate(function(email) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return email.length;
//   }, 'Email cannot be blank');

// // Validate empty password
// UserSchema
//   .path('hashedPassword')
//   .validate(function(hashedPassword) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return hashedPassword.length;
//   }, 'Password cannot be blank');

// // Validate email is not taken
// UserSchema
//   .path('email')
//   .validate(function(value, respond) {
//     var self = this;
//     this.constructor.findOne({email: value}, function(err, user) {
//       if(err) throw err;
//       if(user) {
//         if(self.id === user.id) return respond(true);
//         return respond(false);
//       }
//       respond(true);
//     });
// }, 'The specified email address is already in use.');

// var validatePresenceOf = function(value) {
//   return value && value.length;
// };

// /**
//  * Pre-save hook
//  */
// UserSchema
//   .pre('save', function(next) {
//     if (!this.isNew) return next();

//     if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
//       next(new Error('Invalid password'));
//     else
//       next();
//   });

/**
 * Methods
 */
// var usersc = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashedPassword;
//   },
//   makeSalt: function() {
//     return crypto.randomBytes(16).toString('base64');
//   },
// encryptPassword: function(password) {
//     if (!password || !this.salt) return '';
//     var salt = new Buffer(this.salt, 'base64');
//     return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
//   }
// };
//module.exports = mongoose.model('User', UserSchema);

var db = require('../../db');

var users = {};

users.getUserById = function(userId, callback){
    console.log('users to be fetched');
    var retrieveUsersSql = getRetrieveUsersSql();
    retrieveUsersSql += ' where user_id = ?'
    db.query(retrieveUsersSql,userId, function(err, users){
        console.log('db users - ' + users.length);
        callback(err, users[0]);
    })
    
}

users.getUser = function(req, callback){
    console.log('user to be fetched');
    var retrieveUsersSql = getRetrieveUsersSql();
    retrieveUsersSql += ' where email = ? LIMIT 1';
    db.query(retrieveUsersSql,req.email, function(err, users){
        console.log('db user - ' + users[0].password);
        var userEntity = users[0];
        //userEntity.hashedPassword = encryptPassword(userEntity.password);
        //console.log('hashed password - ' + userEntity.hashedPassword);
        callback(err, userEntity);
    })
}

users.create = function(req, callback){
    console.log('user create');
    // var salt = new Buffer(makeSalt(), 'base64');
    var userEntity = {};
    userEntity.email = req.body.email;
    userEntity.username = userEntity.email.substr(0,userEntity.email.indexOf('@'));
    // console.log('returned salt - ' + salt);
    userEntity.salt = userEntity.username;
    console.log('user entity salt 1- ' + userEntity.salt);
    userEntity.password = encryptPassword(userEntity.salt, req.body.password);
    userEntity.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    userEntity.status = 0;
    userEntity.user_group_id = 1;

    var insertSql = 'INSERT INTO user SET ?';
    console.log('user entity salt 2- ' + userEntity.salt);
    var sql = db.query(insertSql, userEntity, function(err, res){
        console.log('user entity salt 3- ' + userEntity.salt);
        console.log('user created - ' + res.insertId);
        var user_id = res.insertId;
        var sql = 'select * from user where user_id = ?';
        db.query(sql, user_id, function(err1, user){
            console.log('user fetched - ' + user.length);
            callback(err1, user[0]);
        })
    });
    console.log('sql query returned - ' + sql.sql);
}

users.authenticate = function(userEntity, plainText){
    console.log('lhs: ' + encryptPassword(userEntity.salt, plainText));
    console.log('lhs:1 ' + encryptPassword(userEntity.salt, plainText));
    console.log('rhs: ' + userEntity.password);
    
    return encryptPassword(userEntity.salt, plainText) === userEntity.password;
}

var getRetrieveUsersSql = function(){
    var sql = 'select *';
        sql += ' from user';
    return sql; 
}

var encryptPassword = function(salt, password) {
    if (!password || !salt) return '';
    // var salt = new Buffer(makeSalt(), 'base64');
    console.log('salt - ' + salt + ' - ' + password);
    return crypto.pbkdf2Sync(password, salt, 10000, 64,'sha1').toString('base64');
}

var makeSalt = function() {
      return crypto.randomBytes(16).toString('base64');
}


module.exports = users;
