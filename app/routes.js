var apiClient = require('./api_client');

module.exports = function(match) {
  match('/', function(callback) {
    console.log('index');

    apiClient.get('/products.json', function(err, res) {
      if (err) return callback(err);

      var products = res.body;
      callback(null, 'Frontpage', {products: products});
    });

  });

  match('/products/:slug', function(slug, callback) {
    console.log('product: ' + slug);

    apiClient.get('/products/' + slug + '.json', function(err, res) {
      if (err) return callback(err);

      var product = res.body;
      callback(null, 'Product', product);
    });
  });

  match('/shoppingcart', function(callback) {
    console.log('cart');

    apiClient.get('/shoppingcart.json', function(err, res) {
      if (err) return callback(err);

      var cartProducts = res.body;

      callback(null, 'ShoppingCart', {
        products: cartProducts
      });
    });
  });  

  match('/skjema', function(callback) {
    console.log('skjema');

    apiClient.get('/skjema.json', function(err, res) {
      if (err) return callback(err);

      callback(null, 'Form');
    });

  });

};
