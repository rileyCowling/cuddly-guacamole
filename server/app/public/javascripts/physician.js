/**** Main Account Page For Patients ****/


    

var bpmChart;
var oxyChart;

document.getElementById("resetGraph").onclick = function() {
    bpmChart.destroy();
    oxyChart.destroy();
    document.getElementById("day").selectedIndex=0;
    document.getElementById("graphContainer").style.display = "none";
}


//**** Taking care of the log out process
$("#logoutButton").click(function(){
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
});
    
    
function displayGraph(day) {
    window.alert("displayGraph function called ");
    let txdata = {
        email: "user2",
    }
    $.ajax({
        url: '/patients/data',
        method: 'POST',
        headers: { 'x-auth' : window.localStorage.getItem("token") },
        contentType: 'application/json',
        data: JSON.stringify(txdata),
        dataType: 'json'
    })
    .done(function (data, textStatus, jqXHR) {
        
        window.alert("made it to done");


        //This is taken from the account.html script I think
        //basically we just need to get the patient that just got clicked on 


        //Shouldnt happen but just incase
        // if(data.bpm == 0) {
        //     console.log("no choice yet");
        //     return;
        // }

        // //Make chart area visible and code needed for Chart.js to function
        // document.getElementById("graphContainer").style.display = "block";
        // //bpm chart
        // const ctx1 = document.getElementById('bpmGraph');
        // bpmChart = new Chart(ctx1, {
        //     type: 'line',
        //     data: {
        //         //can be replaced with times/values from board
        //         labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
        //         datasets: [{
        //             label: 'Heart Rate',
        //             data: data.bpm,
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         maintainAspectRatio: false,
        //         scales: {
        //             y: {
        //                 beginAtZero: false
        //             }
        //         }
        //     }
        // });
        // //oxy chart
        // const ctx2 = document.getElementById('oxyGraph');
        // oxyChart = new Chart(ctx2, {
        //     type: 'line',
        //     data: {
        //         //can be replaced with times/values from board
        //         labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
        //         datasets: [{
        //             label: 'Oxygen Saturation',
        //             data: data.oxy,
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         maintainAspectRatio: false,
        //         scales: {
        //             y: {
        //                 beginAtZero: false
        //             }
        //         }
        //     }
        // });
    }); 
}
    



    







