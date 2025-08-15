const Product = require("../../models/products");

const usersearch =  async (req, res) => {
  const q = req.query.q;
  try {
    const results = await Product.find({
      title: { $regex: q, $options: 'i' },
    });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = usersearch;