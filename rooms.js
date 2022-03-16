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
