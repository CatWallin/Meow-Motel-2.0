// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
var bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}))
PORT        = 6459;                 // Set a port number at the top so it's easy to change in the future
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
    query1 = `INSERT INTO reservation (check_in, check_out, customer_id, room_id) VALUES ('${data['input-checkin']}', '${data['input-checkout']}', '${data['input-customer']}', '${data['input-room']}',)`;
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

    let room = parseInt(data.room_id);
    if (isNaN(room))
    {
        room = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO cat (first_name, last_name, notes, room_id) VALUES ('${data['input-first-name']}', '${data['input-last-name']}', '${data['input-notes']}', ${room})`;
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

app.post('/add-cat-reservation-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO cat_reservation (cat_id, reservation_id) VALUES ('${data['input-cat']}', '${data['input-reservation']}')`;
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
            res.redirect('/cat_reservation');
        }
    })
})

app.post('/add-cat-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO cat_customer (cat_id, customer_id) VALUES ('${data['input-cat']}', '${data['input-customer']}')`;
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
            res.redirect('/cat_customer');
        }
    })
})


app.post('/add-room-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO room (clean, occupied, employee_id) VALUES ('${data['input-clean']}', '${data['input-occupied']}', '${data['input-employee']}')`;
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
            res.redirect('/rooms');
        }
    })
})

app.delete('/delete-cat-customer-ajax/', function(req,res,next){
    let data = req.body;
    let catId = parseInt(data.id);
    let deleteCat = `DELETE FROM cat WHERE cat_id = ?`;
    let deleteCustomer = `DELETE FROM customer WHERE customer_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteCat, [catID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

app.put('/put-employee-ajax', function(req, res, next) {
    let data = req.body;

    let firstName = parseString(data.first_name);
    let lastName = parseString(data.last_name);
    let employeeId = parseInt(date.employee_id);

    let queryUpdateEmployee = 'UPDATE employee SET first_name = ?, last_name = ? WHERE employee_id = ?';
    let querySelectEmployee = `'SELECT first_name, last_name, employee_id FROM employee WHERE id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateEmployee, [firstName, lastName, employeeId], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(querySelectEmployee, [employeeId], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
})});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});