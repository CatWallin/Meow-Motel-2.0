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

    router.delete('/delete-cat-reservation-ajax/', function(req,res,next){
      let data = req.body;
      let catReservationID = parseInt(data.id);
      let deleteCatReservation= `DELETE FROM cat_reservation WHERE pid = ?`;
      let deleteReservation= `DELETE FROM reservation WHERE id = ?`;
    
    
        // Run the 1st query
        db.pool.query(deleteCatReservation, [catReservationID], function(error, rows, fields){
            if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
    
              else
              {
                // Run the second query
                db.pool.query(deleteReservation, [catReservationID], function(error, rows, fields) {
    
                  if (error) {
                      console.log(error);
                      res.sendStatus(400);
                  } else {
                      res.sendStatus(204);
                  }
                })
              }
    })});

    



    return router;
}();