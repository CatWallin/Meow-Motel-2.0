module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveEmployees(req, res){
        var query = 'SELECT first_name, last_name, room_id FROM employee';
        var query2 = 'SELECT * from room';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfEmployees(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.employees = results;
          //pass it to handlebars to put inside a file
          res.render('employees', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfEmployees)

        function handleRenderingOfRooms(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
    
          context.rooms = results;
    
          res.render('employees', context)
        }
        mysql.pool.query(query2, handleRenderingOfRooms)

        //res.send('Here you go!');
    }

    router.get('/', serveEmployees);
    return router;
}();