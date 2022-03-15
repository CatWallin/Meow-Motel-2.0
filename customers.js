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

    /* Find people whose fname starts with a given string in the req */
    function getPeopleWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT customer_id, first_name, last_name FROM customer = customer_id WHERE customer_id.first_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    router.get('/', serveCustomers);

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["search_customer.js"];
      var mysql = req.app.get('mysql');
      getPeopleWithNameLike(req, res, mysql, context, complete);
      getPlanets(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('customers', context);
          }
      }
  });

    return router;
}();