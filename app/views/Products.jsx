var React = require("react");
var ProductTeaser = require("./ProductTeaser.jsx");

var Products = React.createClass({
	render: function() {
		return <section id={this.props.id} className="section solid">
					<div className="container">
						<div className="product-teasers">
							{this.props.products.map(function (props) {
								return <ProductTeaser key={props.slug} className="product-teaser" {...props} />;
							})}
						</div>
					</div>
				</section>				
	}
});

module.exports = Products;