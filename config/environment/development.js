'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
//   mongo: {
//     uri: 'mongodb://localhost/shopnx-dev'
//   },
  
  // MySql connection options
      mysql: {
          host     : '127.0.0.1',
          user     : 'root',
          password : '',
          database : 'nodestore',
          connectionString: 'mysql://root:'+'@127.0.0.1/' + 'nodestore' 
    },

    clientDomain: 'http://localhost:8080'
    // clientDomain: 'http://localhost'
  // seedDB: true
};
