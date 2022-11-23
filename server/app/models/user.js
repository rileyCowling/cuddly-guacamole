const db = require("../db");

const userSchema = new db.Schema({
    name:       String,
    age:        Number,
    heartRate:  Array,
    spo2:       Array
    // NEED TO COME UP WITH WHAT THIS LOOKS LIKE 
 });


const User = db.model("User", userSchema);

module.exports = User;