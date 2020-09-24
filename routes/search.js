const express = require('express');
const router = express.Router();
const config = require('config');

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
      response.send("An error has occurred");
    } else {
      const dbo = db.db('test');

      if (searchTerm.length > 0) {
        const dbo = db.db('test');
        const searchReg = new RegExp(escapeRegex(searchTerm));
        dbo.collection('caloriedata').find( { 'Display_Name' : { '$regex' : searchReg, '$options' : 'i' } } ).toArray(function(error, documents) {
          if (err) throw error;
          response.send(documents);
        });

      } else {
        var cursor = dbo.collection('caloriedata').find();
        cursor.forEach(function(item) {
          if (item != null) {
            // ADD SOMETHING HERE
          }
        }, function(err) {
          db.close();
        });
      }

    }
  });


});

module.exports = router;
