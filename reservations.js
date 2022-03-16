module.exports = function(){
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res)
  {  
      var db = req.app.get('mysql');
      let query1 = "SELECT * FROM reservation;";

      let query2 = "SELECT room_id FROM room;";

      let query3 = "SELECT * FROM customer;"

      db.pool.query(query1, function(error, rows, fields){
      
          let reservations = rows;
          
          db.pool.query(query2, (error, rows, fields) => {
              
              let rooms = rows;

              db.pool.query(query3, (error, rows, fields) => {
              
                  let customers = rows;
                  return res.render('reservations', {reservations: reservations, rooms: rooms, customers: customers});
              })  
          })  
      })
  });         


  return router;
}();

