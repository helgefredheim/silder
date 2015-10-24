var React = require("react");

var Header = React.createClass({
	render: function() {
		return <div className='section section--fullheight frontpage-banner'>
					<header className='frontpage-header'>
						<div className="container">
							<h1 className='site-logo'>
								<a href="/">{this.props.title}</a>
							</h1>
						</div>
					</header>
				</div>
	}
});

module.exports = Header; 