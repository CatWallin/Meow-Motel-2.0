module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res)
  {  
      var db = req.app.get('mysql');
      let query1 = "SELECT * FROM cat_reservation;";

      let query2 = "SELECT * FROM cat;";

      let query3 = "SELECT * FROM reservation;"

      db.pool.query(query1, function(error, rows, fields){
      
          let cat_reservation = rows;
          
          db.pool.query(query2, (error, rows, fields) => {
              
              let cats = rows;

              db.pool.query(query3, (error, rows, fields) => {
              
                  let reservations = rows;
                  return res.render('cat_reservation', {cat_reservation: cat_reservation, cats: cats, reservations: reservations});
              })  
          })  
      })
  });    


    return router;
}();