const Cart = require("../../models/cart");

const usercartprod = async(req,res)=>{
  const userId = req.user.id;
    if(req.user.role!='user') return res.status(403).json({message:"Login as User"});

    const cartProd = await Cart.find({userId});
    return res.status(200).json(cartProd);
};

module.exports = usercartprod;
