
var Reviews = require('./review.model');

exports.getAllReviews = function(req, res){
    console.log('reviews index called');
    Reviews.getAllReviews(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    });
}

exports.create = function(req, res){
    console.log('review create called');
    Reviews.create(req, function(err, data){
          if(err) { 
            return handleError(res, err); 
          }
          if(!data) { 
            return res.status(404).send('Not Found'); 
          }
          console.log('data - ' + data.length);
          return(res.json(data));
    });        
}

function handleError(res, err) {
  return res.status(500).send(err);
}
