const Products = require("../models/productSchema");

const productController = async (req, res) => {
  const products = await Products.find();

  if (!products) {
    return res.status(404).json({ message: "products not found", status: 404, success: false });
  }
  return res.status(200).json({ message: "products found", status: 200, success: true, products });
};

module.exports = productController;