module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCats(res, mysql, context, complete){
      mysql.pool.query("SELECT first_name, last_name, notes, room_id, customer_id, reservation_id FROM cat", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.cats  = results;
          complete();
      });
  }

  function getCustomers(res, mysql, context, complete){
      mysql.pool.query("SELECT first_name, last_name, reservation_id FROM customer", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.customers = results;
          complete();
      });
  }

    router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
      var mysql = req.app.get('mysql');
      getCats(res, mysql, context, complete);
      getCustomers(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('cats', context);
          }
      }
    });

    




    return router;
}();
