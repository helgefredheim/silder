var React = require("react");
var ReactDOM = require("react-dom");


var ErrorLink = React.createClass({

	setFocus: function(e) {
		e.preventDefault(); 
		e.stopPropagation(); 
		this.props.hasFocus = true; 
	}, 

	render: function() {
		return <a data-pass-thru id={"error-message-" + this.props.field} onClick={this.setFocus} href={"#" + this.props.field}>{this.props.msg}</a>
	}
});

var ErrorListTitle = React.createClass({

	render: function() {
		if(this.props.errors.length === 0) {
			return null
		} 
		return <h1>Det er {this.props.errors.length} feil i skjemaet</h1>	
	}
});

var ErrorList = React.createClass({

	componentDidMount: function() {
		if(this.props.errors.length > 0) {
			ReactDOM.findDOMNode(this.refs["list-container"]).focus(); 
		}
	},

	render: function() {
		return <div ref="list-container" role="alert" aria-live="polite" tabIndex="-1">
			<ErrorListTitle errors={this.props.errors} />
			<ul>
				{this.props.errors.map(function(errProps, key) {
					return <li key={key}>
						<ErrorLink {...errProps}/>
					</li>
				})}
			</ul>
		</div>
	}
});

var Form = React.createClass({

	getInitialState: function() {
		return {
			errors: []
		}
	},

	validateFornavn: function() {
		var fornavn = this.refs.fornavn.value; 
		if(!fornavn || fornavn.trim() === "") {
			return {
				msg: "Vennligst fyll ut fornavn",
				field: "fornavn",
				hasFocus: false
			};
		} else if(!/^[a-zA-Z]+$/.test(fornavn)) {
			return {
				msg: "Fornavn kan bare inneholde bokstaver",
				field: "fornavn",
				hasFocus: false
			};
		} else {
			return null; 
		}
	},

	validateTelefon: function() {
		var telefon = this.refs.telefon.value; 
		if(!telefon || telefon.trim() === "") {
			return {
				msg: "Vennligst fyll ut telefon",
				field: "telefon",
				hasFocus: false
			}
		} else if(!/^\d+$/.test(telefon)) {
			return {
				msg: "Telefon kan bare inneholde tall",
				field: "telefon",
				hasFocus: false
			}
		} else {
			return null; 
		}
	},

	validateEpost: function() {
		var epost = this.refs.epost.value; 
		var epostRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
		if(!epost || epost.trim() === "") {
			return {
				msg: "Vennligst fyll ut epost",
				field: "epost",
				hasFocus: false
			}
		} else if(epostRegex.test(epost)) {
			return {
				msg: "Du må skrive en gyldig e-post-adresse",
				field: "epost",
				hasFocus: false
			}
		} else {
			return null; 
		}		
	},

	validateForm: function(e) {
		e.preventDefault();
		var errors = [];
		errors.push(this.validateFornavn(), this.validateTelefon(), this.validateEpost());
		this.setState({"errors": errors});
	},

	validateFormField: function(e) {
		var el = e.currentTarget;
		var ref = el.getAttribute("data-ref");
		var errorKey = ref + "Error";
		var state = {};
		var err; 
		state[errorKey] = "";

		switch(ref) {
			case "epost": 
				err = this.validateEpost(); 
				break;
			case "fornavn": 
				err = this.validateFornavn();
				break;
			case "telefon":
				err = this.validateTelefon(); 
				break;
		}

		if(err) {
			state[errorKey] = err.msg;
		} else {
			var error = this.state.errors.filter(function(err) {
				return err.field === ref
			})[0];
			if(error) {
				var errors = this.state.errors; 
				var index = errors.indexOf(error);
				errors.splice(index, 1);
				this.setState({"errors": errors});
			}
		}

		this.setState(state);
	},

	render: function() {
		return 	<div className="section section--fullscreen highlighted">
					<div className="container well highlighted">
						<h2 className="section-title">
							<span>{this.props.title}</span>
						</h2>

						<form onSubmit={this.validateForm} noValidate>
							<ErrorList errors={this.state.errors} />
							<div>
								<label htmlFor="first-name">Fornavn</label>
								<input 
									id="first-name" 
									ref="fornavn" data-ref="fornavn" className="input-text" type="text" required="required" 
									aria-required="true" 
									aria-describedby="error-message-fornavn-inline" 
									onBlur={this.validateFormField} 
									autoFocus={this.state.errors.fornavn && this.state.errors.fornavn.hasFocus} />
								<span ref="fornavn-error" id="error-message-fornavn-inline">{this.state.fornavnError}</span> 
							</div>
							<div>
								<label htmlFor="phone">Telefon</label>
								<input id="phone" ref="telefon" data-ref="telefon" className="input-text" type="text" required="required" aria-required="true" aria-describedby="error-message-telefon-inline" onBlur={this.validateFormField} />
								<span ref="telefon-error" id="error-message-telefon-inline">{this.state.telefonError}</span>
							</div>
							<div>
								<label htmlFor="email">E-post</label>
								<input id="email" ref="epost" data-ref="epost" className="input-text" type="text" required="required" aria-required="true" aria-describedby="error-message-epost-inline" onBlur={this.validateFormField} />
								<span ref="epost-error" id="error-message-epost-inline">{this.state.epostError}</span>
							</div>
							<input type="submit" value="Send" />
						</form>

					</div>
				</div>
	}
});

module.exports = Form;