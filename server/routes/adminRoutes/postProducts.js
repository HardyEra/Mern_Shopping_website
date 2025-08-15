const Product = require("../../models/products");

const adminpostproducts = async (req, res) => {
  try {
    if(req.user.role!='admin') return res.status(403).json({message:"Only Admins Allowed to post"});


    const { adminId, title, price, description } = req.body;
    const image = req.file.path || req.file.secure_url;
    const product = new Product({ adminId, title, price, description, image });
    await product.save();

    return res.status(200).json({ message: "Success: Admin Products" });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ message: "Error uploading product" });
  }
};

module.exports = adminpostproducts;