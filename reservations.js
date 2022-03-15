/*
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveReservations(req, res){
        var query = 'SELECT check_in, check_out, customer_id, room_id FROM reservation';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfReservations(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.reservations = results;
          //pass it to handlebars to put inside a file
          res.render('reservations', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfReservations)

        //res.send('Here you go!');
    }

    router.get('/', serveReservations);
    return router;
}();
*/

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

