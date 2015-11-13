var React = require("react");

var Footer = React.createClass({
	render: function() {
		return 	<footer className="section footer">
					<div className="container">

						<form className="form-newsletter">
							<fieldset>
								<legend>Abonner på nyhetsbrev</legend>
								<label for="newsletter-email" className="visually-hidden">E-post-adresse</label>
								<input type="email" name="email" id="newsletter-email" autoComplete="off" placeholder="dittnavn@domene.no" className="input-text input-newsletter-email" />
								<input type="submit" value="Abonner!" className="btn btn-black" />
							</fieldset>
						</form>

						<ul className="pills pills--footer">
							<li><a href="#">Betingelser</a></li>
							<li><a href="#">Om Silder</a></li>
							<li><a href="#">Kontakt</a></li>
						</ul>
					</div> 
				</footer>
	}
});

module.exports = Footer;