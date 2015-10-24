var ProductsCollection = require("../collections/ProductsCollection");
var CartModel = require("../models/CartModel");

this.cartModel = this.cartModel || new CartModel(); 

this.productsCollection = this.cartModel.productsCollection;

module.exports.productsCollection = this.productsCollection;
module.exports.cartModel = this.cartModel; 