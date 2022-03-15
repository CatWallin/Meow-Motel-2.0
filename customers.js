module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCustomers(req, res){
        var query = 'SELECT first_name, last_name FROM customer';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfCustomers(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.customers = results;
          //pass it to handlebars to put inside a file
          res.render('customers', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCustomers)

        //res.send('Here you go!');
    }


    router.get('/', serveCustomers);
    return router;
}();