function signup() {
    // data validation
    if ($('#email').val() === "") {
        window.alert("Invalid Email!");
        return;
    }
    if ($('#password').val() === "") {
        window.alert("Invalid Password");
        return;
    }

    var email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,5}$/;
    if($('#email').val().match(email)) { 
        //All good
    }
    else{ 
        alert('Email is invalid');
        return false;
    }

    var password = /(?=^.{10,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if($('#password').val().match(password)) { 
        //All good
    }
    else{ 
        alert('Password is invalid. Must contain at least 10 characters including at least one numeric digit, one symbol, one uppercase and one lowercase letter');
        return false;
    }

    //send info to server (direct copy, havent tested yet)
    $.ajax({
        url: '/customers/signUp',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(txdata),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        $('#rxData').html(JSON.stringify(data, null, 2));
        if (data.success) {
            // after 1 second, move to "login.html"
            setTimeout(function(){
                window.location = "login.html";
            }, 1000);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 404) {
            $('#rxData').html("Server could not be reached!!!");    
        }
        else $('#rxData').html(JSON.stringify(jqXHR, null, 2));
        document.getElementById('rxData').style.display = "block";
    });
}

//activate on button press
$(function () {
    $('#signupButton').click(signup);
});