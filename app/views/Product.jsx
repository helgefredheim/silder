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
						<div className="silder-row around">
							<div cols="7" className="column">
								<img alt={this.props.imageTitle} src={this.props.imageUrl + "?fit=thumb&w=600&h=600"} />
							</div> 
							<div cols="5" className="column">
								<h1 className="product-title">{this.props.productName}</h1>
								<p className="product-price">Pris: {this.props.priceDisplay}</p>
								// <AddToCartButton {...this.props} />
								<div className="product-information" dangerouslySetInnerHTML={this.getDescription()}></div> 
								// <div className="btn-row">  
								// 	<AddToCartButton {...this.props} />
								// </div>
							</div>
						</div>
					</section> 
					
				</div> 
	}
});

module.exports = Product; 