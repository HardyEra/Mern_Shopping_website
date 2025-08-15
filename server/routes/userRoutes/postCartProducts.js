const Cart = require("../../models/cart");
const Product = require("../../models/products");

const usercartproducts = async (req, res) => {
  if (req.user.role !== 'user') return res.status(403).json({ message: "Login as User" });

  const userId = req.user.id;
  const { prodId } = req.body;

  const product = await Product.findById(prodId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { title, price, description, adminId } = product;

  const cartProd = new Cart({
    adminId,
    userId,
    prodId,
    title,
    price,
    description
  });

  await cartProd.save();

  return res.status(200).json({ message: "Product added to cart" });
};
module.exports = usercartproducts;