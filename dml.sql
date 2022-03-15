-- SELECTS 

--customer
SELECT * FROM customer;

--employee
SELECT * FROM employee;

--cat customer 
SELECT * FROM cat_customer;

-- room
SELECT * FROM room;

-- cat
SELECT * FROM cat;

-- reservation
SELECT * FROM reservation;

-- cat_reservation
SELECT * FROM cat_reservation;


-- INSERTS

--customer
--Query for adding a new customer into the system
INSERT INTO customer (first_name, last_name)
    VALUES ($first_name, $last_name);

--employee
--Query for adding a new employee into the system
INSERT INTO customer (first_name, last_name)
    VALUES ($first_name, $last_name);

--cat customer
--Query for adding a new cat customer into the system
INSERT INTO cat_customer (cat_id, customer_id)
    VALUES ($cat_id, $customer_id);

--Query for adding a new room into the system
INSERT INTO room (room_id, clean, occupied, cat_id, employee_id, reservation_id)
VALUES ($room_id, $clean, $occupied, $cat_id, $employee_id, $reservation_id);

--Query for adding a new cat into the system
INSERT INTO cat (first_name, last_name, notes, room_id, customer_id, reservation_id)
VALUES ($first_name, $last_name, $notes, $room_id, $customer_id, $reservation_id);

--Query for adding a new reservation into the system
INSERT INTO reservation (check_in, check_out, customer_id)
VALUES ($check_in, $check_out, $customer_id);

--Query for adding a new cat_reservation into the system
INSERT INTO cat_reservation (cat_id, reservation_id)
VALUES ($cat_id, $reservation_id);

-- DELETES

--customer
DELETE FROM customer WHERE customer_id = $customer_id;

--employee
DELETE FROM employee WHERE employee_id = $employee_id;

--cat customer 
--Query for removing the relationship between a cat and customer
DELETE FROM cat_customer WHERE cat_customer.cat_id=$cat_id AND cat_customer.cat_id=$cat_id

-- room
DELETE FROM room WHERE room_id = $room_id

-- cat
DELETE FROM cat WHERE cat_id = $cat_id

-- reservation
DELETE FROM reservation WHERE reservation_id = $reservation_id

-- cat_reservation
DELETE FROM cat_reservation WHERE cat_reservation.cat_id=$cat_id AND cat_reservation.reservation_id=$reservation_id


--UPDATES

--customer
--Query for updating a customer by customer_id
UPDATE customer SET first_name = $first_name, last_name = $last_name WHERE customer_id = $customer_id;

--employee
--Query for updating a employee by employee_id
UPDATE employee SET first_name = $first_name, last_name = $last_name WHERE employee_id = $employee_id;

--room
--Query for updating a room by room_id
UPDATE room SET clean = $clean, occupied = $occupied WHERE room_id = $room_id;

--cat
--Query for updating a cat by cat_id
UPDATE cat SET first_name = $first_name, last_name = $last_name, notes = $notes WHERE cat_id = $cat_id;

--reservation
--Query for updating a reservation by reservation_id
UPDATE reservation SET check_in = $check_in, check_out = $check_out WHERE reservation_id = $reservation_id;
