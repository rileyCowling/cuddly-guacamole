const db = require("../db");

const dataSchema = new db.Schema({
    name:       String,
    heartRate:  Array,
    spo2:       Array,
    avgHR:      Number,
    avgSPO2:    Number
 });


const Data = db.model("Data", dataSchema);

module.exports = Data;