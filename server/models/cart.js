const mongoose = require('mongoose');

const cartSchema =new mongoose.Schema({
    adminId:String,
    userId:String,
    prodId:String,
    title:String,
    price:Number,
    description:String,

})

const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart;