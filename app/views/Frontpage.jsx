var React = require("react");
var Header = require("./Header.jsx");
var Products = require("./Products.jsx");
var About = require("./About.jsx");
var Footer = require("./Footer.jsx");
var ShareOnSocialMedia = require("./ShareOnSocialMedia.jsx");
var isServer = !process.browser;

var Frontpage = React.createClass({

	scrollToProducts: function(e) {
		e.preventDefault(); 
		window.scrollTo(0, document.getElementById("products").offsetTop);
	},

	render: function() {
		return <div className='page page--frontpage'>
					<div className="frontpage-banner-container">
						<div id="frontpage-banner" className="parallax parallax--frontpage" />
						<Header title='Silder' scrollToProducts={this.scrollToProducts} />
					</div>
					<Products id="products" title="Produkter" products={this.props.products} />
					<About />
					<section className="section section--share"> 
						<div className="container">
							<ShareOnSocialMedia title={"Silder"} url={"http://silder.no"} />
						</div>
					</section>
					<Footer />
				</div>;
	}

});

module.exports = Frontpage; 