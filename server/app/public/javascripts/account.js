/**** Main Account Page For Patients ****/

//Wait for document ready
$(function(){
    //**** initial setup of account page to make page unique to user
    $.ajax({
        url: '/patients/home',
        method: 'GET',
        headers: { 'x-auth' : window.localStorage.getItem("token") },
        //body: {'id': 'd2096866-acca-4be1-a201-ac79bdb773d5'},
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        $("h1").prepend(data.email + "'s "); //Provide unique identifier to account page based on patient email
        $("h1").after('<h3> ID#: ' +  data.id  + '</h3>');  //Provide patient with their Account ID# 
        
        //Handling Weekly Summary -- MAX, MIN, AVG --
        let max = 0;
        for (let i=0;i<data.bpm.length;i++){
            if(data.bpm[i]>=max){
               max = data.bpm[i];
            }
        }
        let min = max;
        for (let i=0;i<data.bpm.length;i++){
            if(data.bpm[i] == null) {
                //skip
            }
            else if(data.bpm[i]<=min){
               min = data.bpm[i];
            }
        }
        let avg, sum, num = 0;
        for (let i=0;i<data.bpm.length;i++){
            if(data.bpm[i] == null) {
                //skip
            }
            else {
                sum += data.bpm[i];
                num += 1;
            }
        }
        avg = sum / num;
        //DOM to display the calculated values
        $("#max").html('Maximum - ' + max + ' bpm');
        $("#min").html('Minimum - ' + min + 'bpm');
        $("#avg").html('Average - ' + avg + 'bpm');
        if(data.physician != null){
            $("#default").html("Physician " + data.physician);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        window.location.replace("login.html");
    })
    
    //**** Taking care of Change Password Button
    $("#newPasswordButton").click(function(){
        
        //** Uncomment Below!!! **//

        // // Strong Password Check
        // var password = /(?=^.{10,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // if($('#newPassword').val().match(password)) { 
        //     // All good
        // }
        // else{ 
        //     alert('Password is invalid. Must contain at least 10 characters including at least one numeric digit, one symbol, one uppercase and one lowercase letter');
        //     return false;
        // }
        
        //Create data from text input
        let txdata = {
            password: $("#newPassword").val()
        }
        //Post Request to change a password
        $.ajax({
            url: '/patients/passwordChange',
            method: 'POST',
            headers: { 'x-auth' : window.localStorage.getItem("token") },
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {
            window.alert("Password Has Been Changed");
            window.location.replace("account.html");
        })          
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("Password Change Failed");
                window.location.replace("account.html");
            } 
        });
    });  
    
    //**** Taking care of the log out process
    $("#logoutButton").click(function(){
        window.localStorage.removeItem("token");
        window.location.replace("index.html");
    });

    //**** Choosing your physician
    $.ajax({
        url: '/physicians/list',
        method: 'GET',
    })
    .done(function (data, textStatus, jqXHR) {
        let dataStr = JSON.stringify(data)
        //window.alert(dataStr);
        let dataObj = JSON.parse(dataStr);
        //window.alert(dataObj[0].email);
        let numPhysicians = Object.keys(dataObj).length;  //replace with physicians length
        let physicianHTML = "";
        //TODO once connected to recorded data
        //replace "Physician ${i}" with physicians[i] email
        for(let i = 0; i < numPhysicians; i++) {
            physicianHTML += `<option value="${dataObj[i].email}" >Physician ${dataObj[i].email}</option>`;
        }
        document.getElementById("yourPhysician").innerHTML += physicianHTML;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
            //window.location.replace("login.html");
    })
    //This happens once the dropdown selection is changed
    $('#yourPhysician').change(function(){
        let txdata = {
            physician: $('#yourPhysician').val()
        }
        
        //Ajax Call that will let us put the physician in the patients 
        //DB and the patient in the physician DB
        $.ajax({
            url: '/patients/selectPhysician',
            method: 'POST',
            headers: { 'x-auth' : window.localStorage.getItem("token") },
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {
            window.alert("You have selected " + $('#yourPhysician').val() + " to be your doctor!");
            
        })          // Success
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("Physician Update Failed");
            } 
        });
    
    
    });
        
    

    //**** Device Registration & Removal (IDK if removal will be implemented)



    //**** Time of Day and Frequency 
   



});





