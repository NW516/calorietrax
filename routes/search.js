const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../model/Url');

router.post('/', async (request, response) => {
  const searchTerm = request.body.searchTerm;
  console.log(searchTerm);
  var MongoClient = require('mongodb').MongoClient;
  const config = require('config');
  var url = config.get('mongouri');;

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log("ERROR MSG IS: " + err);
    } else {
      console.log("SUCCESS!");
    }
    const dbo = db.db('test');
    var cursor = dbo.collection('caloriedata').find();

    cursor.forEach(function(item) {
        if (item != null) {
          console.log(item);
        }
    }, function(err) {
          console.log(err);
           db.close();
       }
    );
  });


});

module.exports = router;
