module.exports = function(){
    var express = require('express');
    var router = express.Router();
  
    router.get('/', function(req, res)
    {  
        let query1;
        var db = req.app.get('mysql');

        if (req.query.lname === undefined)
        {
            query1 = "SELECT * FROM customer;";
        }

        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM customer WHERE last_name LIKE "${req.query.lname}%"`
        }


        db.pool.query(query1, function(error, rows, fields){
        
            let customers = rows;
            
            return res.render('customers', {customers: customers});
        })  
    
    });     
  
  
    return router;
  }();