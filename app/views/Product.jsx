var React = require("react");
var NavigationBar = require("./NavigationBar.jsx");
var Footer = require("./Footer.jsx");
var AddToCartButton = require("./AddToCartButton.jsx");
var marked = require("marked");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var Product = React.createClass({

	getDescription: function() {
		return {__html: marked(this.props.description)}
	},

	render: function() {
		return <div className="page page--product solid">
					<NavigationBar title="Silder" />
					<section className="container section solid">
						<div className="product">
							<div className="product-image">
								<img alt={this.props.imageTitle} src={this.props.imageUrl + "?fit=thumb&w=600&h=600"} />
							</div> 
							<div className="product-details">
								<div className="product-facts">
									<h1 className="product-title">{this.props.productName}</h1>
									<p aria-label={"kroner " + this.props.price} className="product-price"><span className="price-unit">kr</span> {this.props.price}</p>
								</div>
								<div className="product-information" dangerouslySetInnerHTML={this.getDescription()}></div> 
								<ul className="pills pills--share">
									<li><a href="#" className="share share--facebook">Del på Facebook</a></li>
									<li><a href="#" className="share share--twitter">Del på Twitter</a></li>
									<li><a href="#" className="share share--pinterest">Pin på Pinterest</a></li>
								</ul>
							</div>
						</div>
					</section> 
					<Footer />
				</div> 
	}
});

module.exports = Product; 