var React = require("react");
var productsCollection = require("../../lib/session").productsCollection;
var ProductModel = require("../../lib/models/ProductModel");

var AddToCartButton = React.createClass({

	addToCart: function() {
		var model = new ProductModel(this.props);
		model.set("key", "product-" + model.cid);
		productsCollection.add(model);
		model.save(); 
	},

	render: function() {
		return 	<button type="button" onClick={this.addToCart} className="btn-outline">Legg i handlekurv</button>
	}
});

module.exports = AddToCartButton;