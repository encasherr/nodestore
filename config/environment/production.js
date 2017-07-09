'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
//   mongo: {
//     uri:    process.env.OPENSHIFT_MONGODB_DB_URL ||
//             'mongodb://localhost/shopnx'
//   },

  // MySql connection options
      mysql: {
          host     : process.env.OPENSHIFT_MYSQL_DB_HOST, 
          port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
          user     : 'adminkH8YX6D',
          password : 'C3tNxKi4CgEt',
          database : 'nodestore',
          connectionString: process.env.OPENSHIFT_MYSQL_DB_URL + 'nodestore' 
      },

     clientDomain: 'http://demo.encasherr.com'

  // seedDB: true
};
