module.exports = function(){
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res)
  {  
    var db = req.app.get('mysql');
    let query1 = "SELECT * FROM cat_customer;";

    let query2 = "SELECT * FROM cat;";

    let query3 = "SELECT * FROM customer;"

    db.pool.query(query1, function(error, rows, fields){
    
        let cat_customers = rows;
        
        db.pool.query(query2, (error, rows, fields) => {
            
            let cats = rows;

            db.pool.query(query3, (error, rows, fields) => {
            
                let customers = rows;
                return res.render('cat_customer', {cat_customers: cat_customers, cats: cats, customers: customers});
            })  
        })  
    })
});  

router.delete('/cat_id/:cat_id/customer_id/:customer_id', function(req, res){
  //console.log(req) //I used this to figure out where did pid and cid go in the request
  console.log(req.params.cat_id)
  console.log(req.params.customer_id)
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM cat_customer WHERE cat_id = ? AND customer_id = ?";
  var inserts = [req.params.cat_id, req.params.customer_id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.status(400); 
          res.end(); 
      }else{
          res.status(202).end();
      }
  })
})

  return router

}();