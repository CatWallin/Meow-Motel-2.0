module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCats(req, res){
        var query = 'SELECT first_name, last_name, notes FROM cat';
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfCats(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.cats = results;
          //pass it to handlebars to put inside a file
          res.render('cats', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfCats)

        //res.send('Here you go!');
    }


    router.get('/', serveCats);
    return router;
}();