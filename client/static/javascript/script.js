
var orders_module = angular.module('orders_app', ['ngRoute']);

orders_module.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/customers',{
            templateUrl: 'partials/customers.html'
        })
        .when('/orders',{
            templateUrl: 'partials/orders.html'
        })
        .when('/products',{
            templateUrl: 'partials/products.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

orders_module.factory('customerFactory', function($http){
  var customers = [];
  var factory = {};
  var errors = [];
  factory.index = function(callback){
    $http.get('/customers').success(function(output){
      customers = output;
      callback(customers);
    })
  }
  factory.getErrors = function(callback){
    return errors;
  }
  factory.create = function(info, callback){
    info.date = Date();
    console.log(info)
    $http.post('/customers', info).success(function($http){
      if($http.error){
        errors.push($http)
        console.log(errors);
      }
      else{
        customers.push($http);
        errors.pop();
      }
    })
  }
  factory.destroy = function(id, index, callback){
    $http.get('/customers/' + id).success(function(output){
      customers.splice(index,1);
    })
  }
  return factory
})


orders_module.controller('customersController', function($scope, customerFactory){
  $scope.customers = [];
  customerFactory.index(function(data){
    $scope.customers = data;
  })
  $scope.errors = customerFactory.getErrors();
  $scope.addCustomer = function(){
    $scope.errors.pop();
    customerFactory.create($scope.new_customer, function(x){})
    $scope.new_customer = {};
  }
  $scope.removeCustomer = function(customer){
    customerFactory.destroy(customer._id, $scope.customers.indexOf(customer))
  }
})
orders_module.factory('productFactory', function($http){
  var products = [];
  var factory = {};
  var errors = [];
  factory.index = function(callback){
    $http.get('/products').success(function(output){
      products = output;
      callback(products);
    })
  }
  factory.getErrors = function(){
    return errors;
  }
  factory.create = function(info, callback){
    $http.post('/products', info).success(function($http){
      if($http.error){
        console.log($http);
        errors.push($http);
      }
      else{
        products.push($http);
        errors.pop();
      }
    })
  }
  return factory;
})
orders_module.controller('productsController', function($scope, productFactory){
  $scope.products = [];
  $scope.new_product = {};
  $scope.options = [{val:10},{val:25},{val:50},{val:100}]
  $scope.errors = productFactory.getErrors();
  productFactory.index(function(data){
    $scope.products = data;
  })
  $scope.selectedQty = $scope.options[0]
  $scope.addProduct = function(){
    for(var x in $scope.errors){
      $scope.errors.pop();
    }
    $scope.new_product.qty=$scope.selectedQty.val;
    productFactory.create($scope.new_product, function(x){});
    $scope.new_product = {};
    $scope.selectedQty = $scope.options[0];
  }
})
orders_module.factory('orderFactory', function($http){
  var orders = [];
  var factory = {};
  var errors = [];
  factory.index = function(callback){
    $http.get('/orders').success(function(output){
      orders = output;
      callback(orders);
    })
  }
  factory.getErrors = function(){
    return errors;
  }
  factory.create = function(info, customer, product, callback){
    if(product.qty>=info.qty && product.qty>0){
      $http.post('/orders', info).success(function($http){
        if($http.error){
          error.push($http.error)
        }
        else{
          order=$http;
          console.log($http)
          order._customer=customer
          order._product=product
          orders.push(order)
        }
      })
    }
    else{
      errors.push('Out of stock')
    }
  }

  return factory;
})
orders_module.controller('ordersController', function($scope, customerFactory, productFactory, orderFactory){
  $scope.customers = [];
  $scope.products = [];
  $scope.orders = [];
  $scope.list = [];
  $scope.date=Date();
  $scope.errors = orderFactory.getErrors();
  customerFactory.index(function(data){
    $scope.customers = data;
    $scope.selectedCustomer = $scope.customers[0];
  })
  productFactory.index(function(data){
    $scope.products = data;
    $scope.selectedProduct = $scope.products[0];
    for(var i = 1; i<=$scope.selectedProduct.qty; i++){
      $scope.list.push(i);
    }
    $scope.qty = $scope.list[0];
  })
  orderFactory.index(function(data){
    $scope.orders = data;
  })
  $scope.update = function(){
    $scope.list = [];
    for(var i = 1; i<=$scope.selectedProduct.qty; i++){
      $scope.list.push(i);
    }
    $scope.qty = $scope.list[0];
  }


  $scope.addOrder = function(){
    for(x in $scope.errors){
      $scope.errors.pop();
    }
    info = {_customer: $scope.selectedCustomer._id, _product: $scope.selectedProduct._id, qty: $scope.qty, date: Date() }
    orderFactory.create(info, $scope.selectedCustomer, $scope.selectedProduct, function(x){});
    for(var i = 0; i<$scope.qty; i++ ){
      $scope.list.pop()
    }
    if($scope.list.length==0){
      $scope.qty = 0;
    }
  }
})
