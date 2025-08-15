const Product = require("../../models/products");

const admingetproducts = async(req,res)=>{
    try{
        if(req.user.role!='admin') return res.status(202).json({message:"Only Admins Allowed"});

    const adminId = req.params.ad_id;

    const products = await Product.find({adminId});
    
    return res.status(200).json(products);
    }
    catch (error){
        console.error(error);
        return res.status(404).json({message:"Error"});
    }
};
module.exports = admingetproducts;