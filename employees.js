module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function serveEmployees(req, res){
      var query = 'SELECT first_name, last_name FROM employee';
      var mysql = req.app.get('mysql');
      var context = {};

      function handleRenderingOfEmployees(error, results, fields){
        console.log(error)
        console.log(results)
        console.log(fields)
        context.employees = results;
        res.render('employees', context)
      }
      //execute the sql query
      mysql.pool.query(query, handleRenderingOfEmployees)

  }

  router.get('/', serveEmployees);
  return router;
}();