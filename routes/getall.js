const express = require('express');
const router = express.Router();
const config = require('config');

router.get('/', async (request, response) => {
  var MongoClient = require('mongodb').MongoClient;
  const config = require('config');
  var url = config.get('mongouri');;

  MongoClient.connect(url, function(err, db) {
    if(err) {
      // ADD SOMETHING HERE
    } else {
      const dbo = db.db('test');
      dbo.collection('caloriedata').find().toArray(function(error, documents) {
        if (err) throw error;
        response.send(documents);
      });
    }

  });
});

module.exports = router;
