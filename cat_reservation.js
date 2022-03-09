module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCatReservation(req, res){
        var query = 'SELECT cat_id, reservation_id FROM cat_reservation';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfCatReservation(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.cat_reservation = results;
          //pass it to handlebars to put inside a file
          res.render('cat_reservation', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCatReservation)

        //res.send('Here you go!');
    }

    router.get('/', serveCatReservation);

    router.delete('/delete-person-ajax/', function(req,res,next){
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