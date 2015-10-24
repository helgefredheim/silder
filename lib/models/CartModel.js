var Backbone = require("backbone");
var ProductsCollection = require("../collections/ProductsCollection.js");
var isServer = !process.browser;

module.exports = Backbone.Model.extend({
	initialize: function() {
		this.productsCollection = new ProductsCollection();
		if(!isServer) {
			this.productsCollection.fetch();
		}
	}
});