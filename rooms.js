/*
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveRooms(req, res){
        var query = 'SELECT room_id, clean, occupied, employee_id FROM room';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfRooms(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.rooms = results;
          //pass it to handlebars to put inside a file
          res.render('rooms', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfRooms)

        //res.send('Here you go!');
    }

    router.get('/', serveRooms);
    return router;
}();
*/

module.exports = function(){
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res)
  {  
      var db = req.app.get('mysql');
      let query1 = "SELECT * FROM room;";

      let query2 = "SELECT * FROM employee;";

      db.pool.query(query1, function(error, rows, fields){
      
          let rooms = rows;
          
          db.pool.query(query2, (error, rows, fields) => {
              
              let employees = rows;
              return res.render('rooms', {rooms: rooms, employees: employees});
          })  
      })
  });         


  return router;
}();
