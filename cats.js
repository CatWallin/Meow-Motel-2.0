module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCats(res, mysql, context, complete){
      mysql.pool.query("SELECT first_name, last_name, notes, room_id FROM cat", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.cats = results;
          complete();
      });
  }


    router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getCats(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('cats', context);
          }
      }
    });

    return router;
}();
