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
app.use('/cat_reservation', require('./cat_reservation.js'));
app.use('/customers', require('./customers.js'));
app.use('/employees', require('./employees.js'));
app.use('/reservations', require('./reservations.js'));
app.use('/', express.static('public'));

app.post('/add-customer-form', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO customer (first_name, last_name) VALUES ('${data['input-first_name']}', '${data['input-last_name']}')`;
    db.pool.query(query1, function(error, rows, fields){
    // Check to see if there was an error
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else{
        res.redirect('/customers');
        }
    })
})

app.post('/add-employee-form', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO employee (first_name, last_name) VALUES ('${data['input-first_name']}', '${data['input-last_name']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else{
            res.redirect('/employees');
        }
    })
    })

app.post('/add-reservation-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
     // Create the query and run it on the database
    query1 = `INSERT INTO reservation (check_in, check_out, customer_id) VALUES ('${data['input-first_name']}', '${data['input-last_name']}', '${data['input-customer_id']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else{
            res.redirect('/reservations');
        }
    })
    })

app.post('/add-cat-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO cat (first_name, last_name, notes) VALUES ('${data['input-first_name']}', '${data['input-last_name']}', '${data['input-notes']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
        }
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else{
            res.redirect('/cats');
        }
    })
    })


      


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});