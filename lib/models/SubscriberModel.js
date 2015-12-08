var Backbone = require("backbone");

module.exports = Backbone.Model.extend({

	initialize: function() {
		this.url = "/nyhetsbrev"
	},

	defaults: {
		"status": "subscribed"
	},

	save: function() {
		alert("Nyhetsbrev-funksjon er under utvikling!");
	}

});