const db = require("../db");

const patientSchema = new db.Schema({
    name:       String,
    age:        Number,
    email:      String,
    password:   String,
    heartRate:  Array,
    spo2:       Array,
    avgHR:      Number,
    avgSPO2:    Number
 });


const Patient = db.model("Patient", patientSchema);

module.exports = Patient;