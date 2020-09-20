const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../model/Url');

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// query MongoDB for user's search term
router.get('/', async (request, response) => {
  let searchTerm = request.query.q;
  var MongoClient = require('mongodb').MongoClient;
  const config = require('config');
  var url = config.get('mongouri');;

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log("ERROR MSG IS: " + err);
    } else {
      const dbo = db.db('test');

      if (searchTerm.length > 0) {
        const dbo = db.db('test');
        const searchReg = new RegExp(escapeRegex(searchTerm));
        console.log(searchReg);
        dbo.collection('caloriedata').find( { 'Display_Name' : { '$regex' : searchReg, '$options' : 'i' } } ).toArray(function(error, documents) {
          if (err) throw error;
          console.log(documents);
          response.send(documents);
        });

      } else {
        var cursor = dbo.collection('caloriedata').find();
        console.log("length = 0")
        cursor.forEach(function(item) {
          if (item != null) {
            //console.log(item);
          }
        }, function(err) {
          console.log(err);
          db.close();
        });
      }

    }
  });


});

module.exports = router;
