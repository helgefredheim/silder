var React = require("react");

var Header = React.createClass({
	render: function() {
		return <div className='frontpage-banner'>
					<header className='frontpage-header'>
						<div className="container">
							<h1 className='site-logo'>
								<a href="/">{this.props.title}</a>
							</h1>
						</div>
					</header>
					<p className="frontpage-header-btns"><a className="btn-arrow" href="#products">To content</a></p>
				</div>
	}
});

module.exports = Header; 