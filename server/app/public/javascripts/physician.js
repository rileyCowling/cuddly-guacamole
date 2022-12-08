/**** Main Account Page For Patients ****/


//**** Taking care of the log out process
$("#logoutButton").click(function(){
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
});
    
