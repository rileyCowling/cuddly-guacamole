const db = require("../db");

const patientSchema = new db.Schema({
    id:         String,
    email:      String,
    password:   String,
    bpm:        [Number],
    oxy:        [Number]
});


const Patient = db.model("Patient", patientSchema);

module.exports = Patient;