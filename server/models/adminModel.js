const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,

})

const Admin = mongoose.model('admin',adminSchema);

module.exports = Admin;