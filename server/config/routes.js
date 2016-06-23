var customers = require('../controllers/customers.js');
var orders = require('../controllers/orders.js');
var products = require('../controllers/products.js');

module.exports = function(app){
  app.get('/', function(req,res){
    res.render('index.html')
  })
  app.get('/customers', function(req, res){
    customers.index(req, res);
  })
  app.post('/customers', function(req, res){
    customers.create(req, res);
  })
  app.get('/customers/:id', function(req, res){
    customers.destroy(req, res);
  })
  app.get('/products', function(req, res){
    products.index(req, res);
  })
  app.post('/products', function(req, res){
    products.create(req, res);
  })
  app.get('/orders', function(req, res){
    orders.index(req, res);
  })
  app.post('/orders', function(req, res){
    orders.create(req, res);
    products.reduce(req, res);
  })
  app.get('/orders/:id', function(req, res){
    orders.destroy(req, res);
  })
  app.get('/partials/:name', function(req, res){
    res.render('partials/'+req.params.name);
  })
}
