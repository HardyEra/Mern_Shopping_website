const Product = require("../../models/products");

const allproducts = async(req,res)=>{
    try{
    const allProducts = await Product.find();

    return res.status(200).json(allProducts);
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Error"});
    }

};
module.exports = allproducts;
