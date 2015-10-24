var React = require("react");
var marked = require("marked");

var ProductTeaser = React.createClass({

	getUrl: function() {
		return "products/" + this.props.slug;
	},

	render: function() {
		return <article cols="4" className={this.props.className}>
					<a href={this.getUrl()} className="img-container">
						<img alt={this.props.imageTitle} src={this.props.imageUrl + "?fit=thumb&w=450&h=450"} />
					</a>
					<h2>
						<a href={this.getUrl()}>
							{this.props.productName}
						</a>
					</h2>
					<p>{this.props.introduction}</p>
					<a className="btn btn-outline btn-small btn-upper" href={this.getUrl()}>Mer</a>
				</article>
	}
});

module.exports = ProductTeaser; 