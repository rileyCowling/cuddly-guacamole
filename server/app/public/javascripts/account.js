
//display heart rate and blood oxygen saturation levels for a given day (different charts)
//x axis - time of day
//y axis - values
//also show min and max
//var Patient = require("../models/patient");


$(function(){
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
    


    



});

