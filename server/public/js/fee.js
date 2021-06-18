// Selected a student from db to show Fee Record 

async function get_std(data){
    $('#table_body').empty();
    $.ajax({ 
        url: '/fee/find_fee',
        type: 'POST',
        cache: false, 
        data: { rollno: data, }, 
        success: await function(data){  
            console.log(data.fee)
            data[0].fee.forEach(element => {
                $('#table_body').append('<tr>'+'<td>' + '' +  data[0].student_id + '</td>'+'<td>' + '' + data[0].name + '</td>'+'<td>' + '' +  element.amount + '</td>'+'<td>' + '' +  element.date + '</td>' +'</tr>');
            });
            
        }
        , error: function(jqXHR, textStatus, err){
            console.log(jqXHR);
            alert('text status :'+textStatus+', err :'+err)
        }
     })
}

function add_fee(){
    // get fee form  data
    const rollno = $('#RollNo').val();
    const amount = $('#amount').val();
    const date = $('#date').val();
    
    $.ajax({
        url : '/fee/add_fee',
        type : 'POST',
        cache : false,
        data : {rollno,amount,date},
        success: function(){
        alert('fee added')
        $('#RollNo').val('');$('#amount').val('');$('#date').val('');
        },
        error: function(jqXHR, textStatus, err){alert('text status :'+textStatus+', err :'+err)}
    })
    
}