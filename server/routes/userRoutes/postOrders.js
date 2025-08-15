const Cart = require("../../models/cart");
const Order = require("../../models/order");
const Product = require("../../models/products");


const postorders = async(req,res)=>{
    if(req.user.role!='user') return res.status(403).json({message:"Login as User"});

    const userId = req.user.id;
    const{prodId} = req.body;
    const product = await Product.findById(prodId)
    if(!product) return res.status(404).json({message:"Not Found: Product"});
    const {adminId, title, price, description} = product;
    const orderList = new Order({ prodId, userId, adminId, title, price, description});
    await orderList.save();

    await Cart.findOneAndDelete({ userId, prodId });
    return res.status(200).json({message:"Product added to order list."});
};

module.exports = postorders;