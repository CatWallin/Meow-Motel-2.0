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