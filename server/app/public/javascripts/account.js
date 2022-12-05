
//display heart rate and blood oxygen saturation levels for a given day (different charts)
//x axis - time of day
//y axis - values
//also show min and max




/* 


//Cannot get function to work in account.js, moved directly into account.html
//Displays the daily view graphs

var bpmChart;
var oxyChart;

document.getElementById("resetGraph").onclick = function() {
    bpmChart.destroy();
    oxyChart.destroy();
    document.getElementById("day").selectedIndex=0;
}

//Cannot get function to work in account.js, moved directly into account.html
//Chooses the data for a given day (from dropdown) Assuming bpm (and other needed values are formated like this)
function dayChoice(day) {
    switch(day) {
        //bpm value, oxy percent;
        case "1": var bpm = [1, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [1, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "2": var bpm = [2, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [2, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "3": var bpm = [3, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [3, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "4": var bpm = [4, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [4, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "5": var bpm = [5, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [5, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "6": var bpm = [6, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [6, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        case "7": var bpm = [7, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70]; 
                    var oxy = [7, 80, 90, 70, 60, 78, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
                    break;
        default: var bpm = 0; oxy = 0; break;
    }
    return [bpm, oxy];
}
//displays daily view graph for a given day (from dropdown)
function displayGraph(day) {

    let [bpm, oxy] = dayChoice(day);
    //some error? Shouldnt happen but just incase
    if(bpm == 0) {
        console.log("no choice yet");
        return;
    }

    document.getElementById("graphContainer").style.display = "block";
    //bpm chart
    const ctx1 = document.getElementById('bpmGraph');
    bpmChart = new Chart(ctx1, {
        type: 'line',
        data: {
            //can be replaced with times/values from board
            labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
            datasets: [{
                label: 'Heart Rate',
                data: bpm,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //oxy chart
    const ctx2 = document.getElementById('oxyGraph');
    oxyChart = new Chart(ctx2, {
        type: 'line',
        data: {
            //can be replaced with times/values from board
            labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
            datasets: [{
                label: 'Oxygen Saturation',
                data: oxy,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
*/