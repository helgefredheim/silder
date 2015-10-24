var contentful = require('contentful');
var settings = require("../settings.js");

var client = contentful.createClient({
  accessToken: settings.CONTENTFUL_ACCESS_TOKEN,
  space: settings.CONTENTFUL_SPACE
});

module.exports = client; 