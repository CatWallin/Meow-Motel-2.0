module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res)
    {  
        var db = req.app.get('mysql');
        let query1 = "SELECT * FROM cat;";

        let query2 = "SELECT room_id FROM room;";

        db.pool.query(query1, function(error, rows, fields){
        
            let cats = rows;
            
            db.pool.query(query2, (error, rows, fields) => {
                
                let rooms = rows;
                return res.render('cats', {cats: cats, rooms: rooms});
            })  
        })
    });         


    return router;
  }();
