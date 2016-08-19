var React = require("react");
var SubscriberModel = require("../../lib/models/SubscriberModel.js");

var NewsletterForm = React.createClass({

	submitHandler: function(e) {
		e.preventDefault();
		var model = new SubscriberModel({
			email: this.refs["newsletter-email"].value
		});
		model.save(); 
	},

	render: function() {
		return <form className="form-newsletter" onSubmit={this.submitHandler} noValidate>
					<fieldset>
						<legend>Få info om nye produkter</legend>
						<label htmlFor="newsletter-email" className="visually-hidden">E-post-adresse</label>
						<input type="email" name="email" id="newsletter-email" autoComplete="off" placeholder="dittnavn@domene.no" className="input-text input-newsletter-email" ref="newsletter-email" />
						<input type="submit" value="Abonner!" className="btn btn-black" />
					</fieldset>
				</form>
	}
});

var Footer = React.createClass({
	render: function() {
		return 	<footer className="section footer">
					<div className="container">
						<p>SILDER &trade; - Martin Christensen - Telefon: 951 29 065 - <a data-pass-thru href="mailto:postmartin@gmail.com">E-post</a></p> 
					</div>
				</footer>
	}
});

module.exports = Footer;