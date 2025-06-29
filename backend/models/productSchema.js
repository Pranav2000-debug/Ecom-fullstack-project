const mongoose = require('mongoose');
const productSchema = mongoose.Schema({}, {strict: false, collection: 'Products'});


const Products = mongoose.model("Products", productSchema);

module.exports = Products;