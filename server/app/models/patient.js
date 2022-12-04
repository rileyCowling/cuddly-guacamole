const db = require("../db");

const patientSchema = new db.Schema({
    email:      String,
    password:   String
});


const Patient = db.model("Patient", patientSchema);

module.exports = Patient;