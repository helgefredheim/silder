var React = require("react");
var ProductTeaser = require("./ProductTeaser.jsx");

var Products = React.createClass({
	render: function() {
		return <section className="section section--fullscreen solid">
					<div className="container solid">
						<h2 className="section-title">
							<span>{this.props.title}</span>
						</h2>
					</div>
					<div className="container">
						<div className="silder-row around"> 
							{this.props.products.map(function (p) {
								return <ProductTeaser key={p.slug} className="column product-teaser" {...p} image="lampe.jpg" />;
							})}
						</div>
					</div>
				</section>				
	}
});

module.exports = Products;