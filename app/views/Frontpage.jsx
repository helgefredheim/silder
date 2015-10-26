var React = require("react");
var Header = require("./Header.jsx");
var Products = require("./Products.jsx");
var About = require("./About.jsx");
var Footer = require("./Footer.jsx");
var isServer = !process.browser;

var Frontpage = React.createClass({

	render: function() {
		return <div className='page page--frontpage'>
					<div id="frontpage-banner" className="parallax parallax--frontpage">
						<img className="mobile" src="images/stumtjener-low.jpg" />
					</div>
					<Header title='Silder' />
					<Products title="Produkter" products={this.props.products} />
					<About title="Om Silder" />
					<Footer />
				</div>;
	}

});

module.exports = Frontpage; 