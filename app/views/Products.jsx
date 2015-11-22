var React = require("react");
var ProductTeaser = require("./ProductTeaser.jsx");

var Products = React.createClass({
	render: function() {
		return <section id={this.props.id} className="section solid">
					<div className="container solid">
						<h2 className="section-title">
							<span>{this.props.title}</span>
						</h2>
					</div>
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