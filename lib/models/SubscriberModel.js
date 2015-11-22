var Backbone = require("backbone");

module.exports = Backbone.Model.extend({

	initialize: function() {
		this.url = "/nyhetsbrev"
	},

	save: function() {
		alert("Nyhetsbrev-funksjon er under utvikling!");
	}

});