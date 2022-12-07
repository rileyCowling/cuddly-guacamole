
//display heart rate and blood oxygen saturation levels for a given day (different charts)
//x axis - time of day
//y axis - values
//also show min and max



$(function(){
    //initial setup of account page to make page unique to user
    $.ajax({
        url: '/patients/home',
        method: 'GET',
        headers: { 'x-auth' : window.localStorage.getItem("token") },
        //body: {'id': 'd2096866-acca-4be1-a201-ac79bdb773d5'},
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        $("h1").prepend(data.email + "'s ");
        $("h1").after('<h3> ID#: ' +  data.id  + '</h3>');
        //No idea if this works, I cant test it without knowing what data is stored. I felt the need to work more on this though
        // let max = Math.max(data.bpm);
        // let min = Math.min(data.bpm);
        // let avg = 0;
        // $("#max").html('Maximum - ' + max + 'bpm');
        // $("#min").html('Minimum - ' + min + 'bpm');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        //window.location.replace("login.html");
    })
    
    /**** Button Handlers  ****/

    //Taking care of Change Password Button
    $("#newPasswordButton").click(function(){
        // // Strong Password 
        // var password = /(?=^.{10,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // if($('#newPassword').val().match(password)) { 
        //     // All good
        // }
        // else{ 
        //     alert('Password is invalid. Must contain at least 10 characters including at least one numeric digit, one symbol, one uppercase and one lowercase letter');
        //     return false;
        // }

        let txdata = {
            password: $("#newPassword").val()
        }

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
        })          // Success
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("Password Change Failed");
                //location.reload();
            } 
        });
    });  
    
    //Taking care of the log out process
    $("#logoutButton").click(function(){
        window.localStorage.removeItem("token");
        window.location.replace("index.html");
    });




});





