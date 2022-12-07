function login() {
    // Ensure that the user has entered an email and password 
    if ($('#email').val() === "") {
        window.alert("You Must Enter Your Email!");
        return;
    }
    if ($('#password').val() === "") {
        window.alert("You Must Enter Your Password!");
        return;
    }
    // Save the Email and Password in the Variable txdata for easy manipulation
    let txdata = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    //Determine where to send the data based on drop down menu response
    if($('#user').val() === "Patient"){
        // AJAX POST Request for patient route
        $.ajax({
            url: '/patients/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) {
            //Storing the generated token in local storage
            window.localStorage.setItem("token",data.token);
            //Lets just work with an ID for now
            window.localStorage.setItem("id",data.id);
            window.location.replace("account.html");
        })        // Success
        .fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 401){
                window.alert("A Patient with that email/password does not exist.");
            } 
        });   // Failure
    }
    if($('#user').val() === "Physician"){
        // AJAX POST Request for physician route
        $.ajax({
            url: '/physicians/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(txdata),
            dataType: 'json'
        })
        .done(function (data, textStatus, jqXHR) { // Success
            window.localStorage.setItem("token",data.token);
            window.location.replace("physician.html");
        })     
        .fail(function (jqXHR, textStatus, errorThrown) {
           if(jqXHR.status == 401){
            window.alert("A Physician with that email/password does not exist.");
           } 
        });   // Failure
    }
}

$(function () {
    $('#loginButton').click(login);
});