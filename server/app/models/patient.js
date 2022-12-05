const db = require("../db");

const patientSchema = new db.Schema({
    id:         String,
    email:      String,
    password:   String,
    bpm:        Array,
    oxy:        Array
});


const Patient = db.model("Patient", patientSchema);

module.exports = Patient;