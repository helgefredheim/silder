var React = require("react");
var NavigationBar = require("./NavigationBar.jsx");
var Footer = require("./Footer.jsx");
var AddToCartButton = require("./AddToCartButton.jsx");
var ShareOnSocialMedia = require("./ShareOnSocialMedia.jsx");
var marked = require("marked");
var Tappable = require('react-tappable');
var ReactSwipe = require('react-swipe')
var ReactDOM = require('react-dom');

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

var Thumbnails = React.createClass({

	setImage: function(index) {
		this.props.activeImage = index;
		this.props.setActiveImage(index);
	},

	componentDidUpdate: function () {
		ReactDOM.findDOMNode(this.refs["has-focus"]).focus(); 
    },

	render: function() {
		var html = this.props.images.map(function (image, index) {
			return <Tappable 
						ref={this.props.activeImage === index ? "has-focus" : ""}
						tabIndex={this.props.activeImage === index ? "0" : "-1"}
						component="img" 
						className={"btn-thumbnail" + (index === this.props.activeImage ? " btn-thumbnail--active" : "")} 
						alt={image.description} 
						data-index={index} 
						onTap={this.setImage.bind(this, index)} onClick={this.setImage.bind(this, index)} 
						key={"thumbnail-image-" + index} 
						width="150" height="150"
						src={image.file.url+ "?fit=thumb&w=150&h=150"} />
		}.bind(this), this);
		return <div className="product-thumbnails">{html}</div>

	}

});

var Gallery = React.createClass({

	getInitialState: function() {
		return { 
			activeImage: 0
		};
	},

	onGalleryKeyDown: function(e) {

		if(e.keyCode === 39) {
			var newState = this.state.activeImage + 1; 
			if(newState === this.props.images.length) {
				newState = this.props.images.length - 1;
			}
			this.setState({
				activeImage: newState
			});
		} else if(e.keyCode === 37) {
			this.setState({
				activeImage: this.state.activeImage - 1 >= 0 ? this.state.activeImage - 1 : 0
			});
		}
	
	},

	setActiveImage: function(index) {
		this.setState({
			activeImage: index
		});
	},

	render: function() {

		return <div tabIndex="0" className="product-images" onKeyDown={this.onGalleryKeyDown}>
					<figure className="product-image-stage" id="image-stage" aria-hidden="true">
						<ReactSwipe callback={this.setActiveImage} slideToIndex={this.state.activeImage} continuous={true}>
							{this.props.images.map(function (image, index) {
								return <img key={"stage-image-" + index} alt={image.description} width="401" height="401" src={image.file.url+ "?fit=thumb&w=800&h=800&q=35"} />
									
							})} 
						</ReactSwipe>
					</figure>
					
					<Thumbnails images={this.props.images} activeImage={this.state.activeImage} setActiveImage={this.setActiveImage} />
					
				</div> 
	}
});

var Product = React.createClass({

	getDescription: function() {
		var desc = this.props.description || "<p>Beskrivelse kommer senere.</p>";
		return {__html: marked(desc)}
	},

	render: function() {

		var thumbnails;
		var imageWidth = 800;
		var imageHeight = 800; 
		var images = this.props.images ? this.props.images.filter(function(image) {
			return image !== null;
		}) : [];

		return <div className="page page--product solid">
					<p className="under-utvikling">Siden er under utvikling</p>
					<NavigationBar title="Silder" />
					<section className="container solid">
						<div className="product"> 
							<Gallery images={images} />
							<div className="product-details">
								<div className="product-facts">
									<h1 className="product-title">{this.props.productName}</h1>
									<p aria-label={"kroner " + this.props.price} className="product-price">
										<span className="price-unit">kr</span> {this.props.price}
									</p>
								</div>
								<div className="product-information" dangerouslySetInnerHTML={this.getDescription()}></div> 
								<ShareOnSocialMedia title={this.props.productName + " fra Silder"} url={"http://silder.no/products/" + this.props.slug} />
							</div>
						</div>
					</section> 
					<Footer />
				</div> 
	}
});

module.exports = Product; 