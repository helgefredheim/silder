var express = require('express');
var session = require('express-session');
var _ = require('underscore');
var httpProxy = require('http-proxy');
var app = express();
var bodyParser = require('body-parser');
var ContentsCollection = require("./collections/ContentsCollection.js");
var ProductContentModel = require("./models/ProductContentModel.js");
var CartModel = require("./models/CartModel.js"); 
var CartsCollection = require("./collections/CartsCollection.js");
var settings = require("../settings.js");
var activeCartsCollection = new CartsCollection(); 

var getActiveCartModel = function(req) {
  if(!req.session.cartModelCid) {
    var model = new CartModel();
    activeCartsCollection.add(model);
    req.session.cartModelCid = model.cid;
    return model; 
  } else {
    return activeCartsCollection.get(req.session.cartModelCid);
  }
}

module.exports = app;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000
  }
}));

var productsCollection = new ContentsCollection([], {
  model: ProductContentModel,
  contentTypeId: settings.PRODUCT_CONTENTTYPE_ID
});

productsCollection.fetch(); 

app.get('/products.json', function(req, res) {
  res.send(productsCollection.toViewJSON());
});

app.get('/products/:slug.json', function(req, res) {
  var slug = req.params.slug;
  var product = productsCollection.findWhere({'slug': slug});

  if (product) {
    res.send(product.toViewJSON());
  } else {
    res.send(404, {error: 'Product ' + slug + ' not found.'});
  }
});

app.post('/shoppingcart.json', function(req, res) {
  var product = req.body;
  var cartModel = getActiveCartModel(req);
  cartModel.productsCollection.add(product)
  res.send({
    success: true, 
    totalPrice: cartModel.productsCollection.getTotalPrice()
  });
});

app.get('/shoppingcart.json', function(req, res) {
  var cartModel = getActiveCartModel(req);
  res.send(cartModel.productsCollection.toJSON());
});

/**
 * On the client, we want to be able to just send API requests to the
 * main web server using a relative URL, so we proxy requests to the
 * API server here.
 */
var proxy = new httpProxy.RoutingProxy();

app.proxyMiddleware = function(apiPort) {
  return function(req, res, next) {
    proxy.proxyRequest(req, res, {
      host: 'localhost',
      port: apiPort
    });
  };
};
