function deleteCatReservation(catReservationID) {
    let link = '/delete-cat-reservation-ajax/';
    let data = {
      id: catReservationID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(catReservationID);
      }
    });
  }
  
  function deleteRow(catReservationID){
      let table = document.getElementById("cat-reservation-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == catReservationID) {
              table.deleteRow(i);
              break;
         }
      }
  }