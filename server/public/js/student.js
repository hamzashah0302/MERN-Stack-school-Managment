// deleting user 
function delete_std(value){
    
    $.ajax({ 
        url: '/student/delete_std',
        type: 'POST',
        cache: false, 
        data: { rollno: value, }, 
        success: function(data){
           alert('Success!')
        }
        , error: function(jqXHR, textStatus, err){
            console.log(jqXHR);
            alert('text status :'+textStatus+', err :'+err)
        }
     })
}
//  find and update Student
function update_std(id){
    
    $.ajax({ 
        url: '/student/find_update_std',
        type: 'POST',
        cache: false, 
        data: { rollno: id, }, 
        success: function(data){
             date = new Date(data.dob);
            var dob =    (date.getMonth() + 1)+ '/' + date.getDate() + '/' + date.getFullYear();
            console.log(dob)
           alert('Success! ' +data.name)
           $('#Rollno_update').val(data.student_id)
           $('#StdName_update').val(data.name)
           $('#Fname_update').val(data.Father_name)
           $('#StdAddress_update').val(data.address)
           $('#dob_update').val(dob)
           $('#class_update').val(data.class)
           $('#ContactNo_update').val(data.contact)
              
        }
        , error: function(jqXHR, textStatus, err){
            console.log(jqXHR);
            alert('text status :'+textStatus+', err :'+err)
        }
     })
}
//  already exist Std ID message from server 


