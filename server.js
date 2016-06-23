var express = require('express');
var app = express();
var bodyParser =require('body-parser');
var path = require('path');

app.use(bodyParser.json());

app.use(express.static(__dirname + "/client/static"))
// app.set('views', path.join(__dirname,'./client/static'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs')

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);
app.listen(8000,function(){
  console.log('Angular Orders listening on 8000')
})
