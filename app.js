// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
var bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}))
PORT        = 6456;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');    

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/


// app.js

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('mysql', db);
app.set('port', process.argv[2]);
app.use('/cats', require('./cats.js'));
app.use('/rooms', require('./rooms.js'));
app.use('/cat_customer', require('./cat_customer.js'));
//app.use('/cat_reservation', require('./cat_reservation.js'));
//app.use('/customers', require('./customers.js'));
//app.use('/employees', require('./employees.js'));
app.use('/reservations', require('./reservations.js'));
app.use('/', express.static('public'));



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});