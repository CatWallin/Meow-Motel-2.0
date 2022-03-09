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


    return router;
}();