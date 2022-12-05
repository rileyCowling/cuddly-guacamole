function signup() {
    
    // Ensure that the user has entered an email and password 
    if ($('#email').val() === "") {
        window.alert("You Must Enter An Email!");
        return;
    }
    if ($('#password').val() === "") {
        window.alert("You Must Enter A Password!");
        return;
    }

    
    // // Valid Email Address 
    // var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}$/;
    // if($('#email').val().match(email)) { 
    //     // All good
    // }
    // else{ 
    //     alert('Email is invalid');
    //     return false;
    // }
    // // Strong Password 
    // var password = /(?=^.{10,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    // if($('#password').val().match(password)) { 
    //     // All good
    // }
    // else{ 
    //     alert('Password is invalid. Must contain at least 10 characters including at least one numeric digit, one symbol, one uppercase and one lowercase letter');
    //     return false;
    // }
    
    


    // Save the Email and Password in the Variable txdata for easy manipulation
    let txdata = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    //Determine where to send the data based on drop down menu response
    if($('#user').val() === "Patient"){
        // AJAX POST Request for patient route
        $.ajax({
            url: '/patients/signUp',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {window.location.replace("login.html");})          // Success
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("A user with that email already exists.");
            } 
        });    // Failure
    }
    if($('#user').val() === "Physician"){
        // AJAX POST Request for physician route
        $.ajax({
            url: '/physicians/signUp',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {window.location.replace("login.html");})          // Success
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("A user with that email already exists.");
            } 
        });   // Failure
    }
    
}

// Wait for the sign up button to be pressed
$(function () {
    $('#signupButton').click(signup);
});