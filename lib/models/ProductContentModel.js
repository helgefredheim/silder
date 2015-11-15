var Backbone = require("backbone");
var _ = require("underscore");

module.exports = Backbone.Model.extend({

	initialize: function() {
		this.set("slug", this.get("fields").slug);
	},

	idAttribute: function() {
		return this.get("sys").id;
	},

	toViewJSON: function() {

		var fields = this.get("fields");
		var hasImage = fields.mainImage.fields;
		var image = fields.mainImage; 

		images = _.map(fields.images || [], function(image) {
			return image.fields
		});	



		return {
			productName: fields.productName,
			slug: fields.slug,
			imageUrl: hasImage ? image.fields.file.url : null,
			imageTitle: hasImage ? image.fields.description : null,
			description: fields.description,
			images: images,
			introduction: fields.introduction || null,
			price: fields.price || 0, 
			priceDisplay: fields.price ? fields.price : "Pris på forespørsel" 
		}
	}
});