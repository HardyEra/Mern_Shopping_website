const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    prodId:String,
    userId:String,
    title:String,
    price:Number,
    description:String,
})
const Order = mongoose.model('order',orderSchema);

module.exports = Order;