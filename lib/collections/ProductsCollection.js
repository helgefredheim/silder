var Backbone = require("backbone");
var _ = require("underscore");
var ProductModel = require("../models/ProductModel.js");

module.exports = Backbone.Collection.extend({
	model: ProductModel, 

	url: "/api/shoppingcart.json",

	getTotalPrice: function() {
		var prices = this.pluck("price");
		return _.reduce(prices, function(memo, num) { 
			return memo + num; 
		}, 0)
	}
});