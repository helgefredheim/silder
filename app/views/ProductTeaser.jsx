var React = require("react");
var marked = require("marked");

var ProductTeaser = React.createClass({

	getUrl: function() {
		return "products/" + this.props.slug;
	},

	render: function() {
		return <article className={this.props.className}>
					<a href={this.getUrl()} title={"Mer informasjon om produktet " + this.props.productName}>
						<div className="img-container">
							<img alt={this.props.productName + ". Foto."} src={this.props.imageUrl + "?fit=thumb&w=600&h=600"} />
						</div>
					
						<h2>
							{this.props.productName}
						</h2>
					</a>
				</article>
	}
});

module.exports = ProductTeaser; 