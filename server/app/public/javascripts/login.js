//direct copy, havent tested yet
function login() {
    let txdata = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    
    $.ajax({
        url: '/test/logIn',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(txdata),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        localStorage.setItem("token", data.token);
        window.location.replace("account.html");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        $('#rxData').html(JSON.stringify(jqXHR, null, 2));
    });
}

$(function () {
    $('#loginButton').click(login);
});