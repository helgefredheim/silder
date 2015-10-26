var React = require("react");
var productsCollection = require("../../lib/session").productsCollection;
var isServer = !process.browser;

var NavigationBar = React.createClass({

	setTotalPrice: function() {
		if(!isServer && this.isMounted()) {
			this.setState({"totalPrice": productsCollection.getTotalPrice()}); 				
		}
	},

	getInitialState: function() {
		productsCollection.on("add", this.setTotalPrice, this);
		productsCollection.on("remove", this.setTotalPrice, this);
		return {
			totalPrice: productsCollection.getTotalPrice()
		};
	},

	render: function() {
		return <div className="page-header">
					<header>
						<div className="container">
							<div className="silder-row">
								<h1 className='site-logo column' cols="4">
									<a href="/">{this.props.title}</a>
								</h1>
							</div>
						</div>
					</header>
				</div>
	}
});

module.exports = NavigationBar; 