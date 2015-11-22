var React = require("react");

module.exports = React.createClass({

	getShareModel: function() {
		var title = this.props.title;
		var url = this.props.url;
		var domain = "silder.no";

		return {
		  facebookUrl: "http://www.facebook.com/sharer/sharer.php?u=" + url + "&title=" + title,
		  twitterUrl: "http://twitter.com/intent/tweet?status=" + title + ": " + url,
		  pinterestUrl: "https://www.pinterest.com/pin/create/button/"
		}
	},

	share: function(e) {
		if(e && e.preventDefault) {
			e.preventDefault()
		}

		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;

	    var width  = 575,
	        height = 400,
	        left   = (windowWidth  - width)  / 2,
	        top    = (windowHeight - height) / 2,
	        url    = e.target.href,
	        title  = e.target.innerHTML, 
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;
	    
	    window.open(url, title, opts);	
	},

	render: function() {

		var model = this.getShareModel(); 
		return <ul className="pills pills--share">
					<li><a data-pass-thru href={model.facebookUrl} onClick={this.share} className="share share--facebook">Del på Facebook</a></li>
					<li><a data-pass-thru href={model.twitterUrl} onClick={this.share} className="share share--twitter">Del på Twitter</a></li>
					<li><a data-pass-thru href={model.pinterestUrl} onClick={this.share} className="share share--pinterest">Pin på Pinterest</a></li>
				</ul>
	}
});