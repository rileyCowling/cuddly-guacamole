const db = require("../db");

const physicianSchema = new db.Schema({
    //id:         String,
    email:      String,
    password:   String,
    patients:   [String]
});


const Physician = db.model("Physician", physicianSchema);

module.exports = Physician;