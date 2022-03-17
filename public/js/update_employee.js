let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

updateEmployeeForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let firstName = document.getElementById("first_name_update");
    let lastName = document.getElementById("last_name_update");

    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    
    if (isNaN(firstNameValue) || isNaN(lastNameValue)) 
    {
        return;
    }

    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", '/put-employee-ajax', true);
    xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {

             // Add the new data to the table
             updateRow(xhttp.response, firstNameValue, lastNameValue);

         }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
             console.log("There was an error with the input.")
         }
     }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}

function editEmployeeInfo(id, firstName, lastName) {
    document.getElementById("employeeDisplay" + id).hidden = true;
    document.getElementById("saveFormRow" + id).removeAttribute("hidden");
}
