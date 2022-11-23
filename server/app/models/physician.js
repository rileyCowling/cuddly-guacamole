const db = require("../db");

const physicianSchema = new db.Schema({
    name:       String,
    email:      String,
    password:   String,
 });


const Physician = db.model("Physician", physicianSchema);

module.exports = Physician;