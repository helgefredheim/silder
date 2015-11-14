var React = require("react");
var ProductTeaser = require("./ProductTeaser.jsx");

var Products = React.createClass({
	render: function() {
		return <section className="section solid container">
					<div className="solid">
						<h2 className="section-title">
							<span>{this.props.title}</span>
						</h2>
					</div>
					
						<div className="product-teasers">
							{this.props.products.map(function (p) {
								return <ProductTeaser key={p.slug} className="product-teaser" {...p} image="lampe.jpg" />;
							})}
						</div>
					
				</section>				
	}
});

module.exports = Products;