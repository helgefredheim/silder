var Backbone = require("backbone");
var CartModel = require("../models/CartModel.js");

module.exports = Backbone.Collection.extend({
	model: CartModel
});