function deleteCatCustomer(cat_id, customer_id){
$.ajax({
    url: 'cat_customer/cat_id/' + cat_id + '/customer_id/' + customer_id,
    type: 'DELETE',
    success: function(result){
        if(result.responseText != undefined){
          alert(result.responseText)
        }
        else {
          window.location.reload(true)
        } 
    }
})
};