const db = require("../db");

const userSchema = new db.Schema({
    name:       String,
    age:        Number
    // NEED TO COME UP WITH WHAT THIS LOOKS LIKE 
 });


const User = db.model("User", userSchema);

module.exports = User;