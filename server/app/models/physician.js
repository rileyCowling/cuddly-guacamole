const db = require("../db");

const physicianSchema = new db.Schema({
    email:      String,
    password:   String,
    
});


const Physician = db.model("Physician", physicianSchema);

module.exports = Physician;