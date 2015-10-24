var Backbone = require("backbone");
var client = require("../contentClient.js");
var isServer = !process.browser;

var ContentsCollection = Backbone.Collection.extend({
	initialize: function(data, attrs) {
		this.contentTypeId = attrs.contentTypeId;
		var that = this; 
		setInterval(function() {
			that.fetch()
		}, 60 * 5 * 1000);
	},

	fetchContent: function() {
		return client.entries({
			content_type: this.contentTypeId
		});
	},

	toViewJSON: function() {
		return this.map(function(model) {
			return model.toViewJSON()
		});
	},

	fetch: function() {
		var that = this; 
		var promise = this.fetchContent();
		promise.then(function(response) {
			that.reset(response);
		}, function(error) {
			that.trigger("error", error);
		});	
		return promise; 
	}

});

module.exports = ContentsCollection; 