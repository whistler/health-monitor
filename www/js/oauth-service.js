/**
  * Helper functions to get signed message, authorization headers and token
  */
function OAuthService() {
	/* the consumerKey and consumerSecret of our Lifely app */
	this.consumerKey = 'aff3864aa0ad45c4b78eb28b92294bf7';
	this.consumerSecret = '57b5ca68e5f94ba9acf5b57b969e95d0';
}

/* 
 * clone from the extra provided parameters and return a new parameters set
 */
OAuthService.prototype.clone = function(extra_parameters) {
	var parameters = {};
	jQuery.extend(parameters,extra_parameters);
	return parameters;
}

/*
 * Request for the token.
 * Return the jqXHR for handling the sent ajax
 */
OAuthService.prototype.makeOAuthRequest = function(method, url, /*callback,*/ extra_parameters, token) {
	extra_parameters = extra_parameters || {};
	token = token || {};
	var realm = this.realm;
	var message = {
		action: url,
		method: method,
		parameters: this.clone(extra_parameters)
	};
	var accessor = {
		consumerKey: this.consumerKey,
		consumerSecret: this.consumerSecret
	};
	if (token.oauth_token) {
		message.parameters.oauth_token = token.oauth_token;
		accessor.token = token.oauth_token;
	}
	if (token.oauth_token_secret) {
		accessor.tokenSecret = token.oauth_token_secret;
	}
	
	OAuth.completeRequest(message, accessor);


	var jqXHR = jQuery.ajax({
					type: method,
					processData: false,
					beforeSend: function (request) {
						request.setRequestHeader("Authorization", OAuth.getAuthorizationHeader(url, message.parameters));
					},
					url: url,
					crossDomain: true	
				});
	return jqXHR;
}

/*
 * Get the returned token from the response text, as well as the token secret
 * Return an object the holds two attributes: oauth_token, oauth_token_secret
 */
 OAuthService.prototype.getToken = function(responseText) {
	return OAuth.getParameterMap(OAuth.decodeForm(responseText));
 }