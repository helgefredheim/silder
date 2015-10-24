var Backbone = require("backbone");
var isServer = !process.browser;

module.exports = Backbone.Model.extend({
	initialize: function() {
		this.url = "/api/shoppingcart.json"
	}
});