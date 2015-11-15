var React = require("react");
var NavigationBar = require("./NavigationBar.jsx");
var Footer = require("./Footer.jsx");
var AddToCartButton = require("./AddToCartButton.jsx");
var marked = require("marked");
var Tappable = require('react-tappable');
var ReactSwipe = require('react-swipe')

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

	getInitialState: function() {
		return { 
			activeImage: 0
		};
	},

	setImage: function(e) {
		e.preventDefault();
		var index = e.currentTarget.attributes["data-index"].value;
		index = parseInt(index);
		this.setState({
			"activeImage": index
		});
	},

	getDescription: function() {
		return {__html: marked(this.props.description)}
	},

	onKeyDown: function(e) {
		if(e.keyCode === 13) {
			this.setImage(e);
		}
	},

	setActiveThumb: function(index) {
		this.setState({
			activeImage: index
		});
	},

	render: function() {

		var thumbnails;

		if(this.props.images) {
			thumbnails = this.props.images.map(function (image, index) {
				return <Tappable 
							component="img" 
							className={"btn-thumbnail" + (index === this.state.activeImage ? " btn-thumbnail--active" : "")} 
							tabIndex="0"
							alt={image.description} 
							data-index={index} 
							onKeyDown={this.onKeyDown} onTap={this.setImage} onClick={this.setImage} 
							key={"thumbnail-image-" + index} 
							width="150" height="150"
							src={image.file.url+ "?fit=thumb&w=150&h=150"} />
			}.bind(this));
		}

		return <div className="page page--product solid">
					<NavigationBar title="Silder" />
					<section className="container solid">
						<div className="product">
							<div className="product-images">
								<div className="product-image-stage" id="image-stage">
									<ReactSwipe callback={this.setActiveThumb} slideToIndex={this.state.activeImage} continuous={false}>
										{this.props.images.map(function (image, index) {
											return <img key={"stage-image-" + index} alt={image.description} width="600" height="600" src={image.file.url+ "?fit=thumb&w=600&h=600"} />
												
										})}
									</ReactSwipe>
								</div>
								<div className="product-thumbnails">
									{thumbnails}
								</div>
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