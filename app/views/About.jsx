var React = require("react");

var About = React.createClass({
	render: function() {
		return 	<div className="section section--fullscreen highlighted">
					<div className="container well highlighted">
						<h2 className="section-title">
							<span>{this.props.title}</span>
						</h2>

						<div className="varsel-bjelle-container">
							<span className="varsel-bjelle"></span>
						</div>
					</div>
				</div>
	}
});

module.exports = About;