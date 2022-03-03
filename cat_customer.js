module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCatCustomers(req, res){
        var query = 'SELECT cat_id, customer_id FROM cat_customer';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfCatCustomers(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.cat_customer = results;
          //pass it to handlebars to put inside a file
          res.render('cat_customer', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCatCustomers)

        //res.send('Here you go!');
    }


    router.get('/', serveCatCustomers);
    return router;
}();