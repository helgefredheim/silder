var React = require("react");
var NavigationBar = require("./NavigationBar.jsx");
var Footer = require("./Footer.jsx");
var marked = require("marked");

var ShoppingCart = React.createClass({
	render: function() {
		return 	<div className="page page--shoppingcart solid">
					<NavigationBar title="Silder" />
					<section className="container section">
						<div className="silder-row around">
							<div cols="8" className="column">
								<h1>Shopping Cart</h1>
								<table>
									<thead>
										<tr><th>Name</th><th>Price</th></tr>
									</thead>
									{this.props.products.map(function (p) {
										return <tr key={p.key}><td>{p.productName}</td><td>{p.price}</td></tr>;
									})}
								</table>
							</div> 
							<div cols="4" className="column">
								Produkter...
							</div>
						</div>
					</section> 
					
				</div>
	}
});

module.exports = ShoppingCart;