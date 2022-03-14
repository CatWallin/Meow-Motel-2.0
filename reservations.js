module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveReservations(req, res){
        var query = 'SELECT check_in, check_out, customer_id FROM reservation';
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

