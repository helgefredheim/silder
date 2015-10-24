var React = require("react");

var Footer = React.createClass({
	render: function() {
		return 	<footer className="section footer">
					<div className="container">
						<div className="silder-row around end">
							<p className="column" cols="3">Info 1</p>
							<p className="column" cols="3">Info 2</p>
							<p className="column" cols="3">Info 3</p>
						</div>
					</div>
				</footer>
	}
});

module.exports = Footer;