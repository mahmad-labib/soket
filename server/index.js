const express = require('express')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const port = 3000
const Order = require('../server/models/order')
//connect to DB
mongoose.connect('mongodb://localhost:27017/test');

//view engine
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  const: layouts = 'views/layouts/',
  const: partial = 'views/partials/',
  layoutsDir: layouts,
  partialsDir: partial,
}));

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//import routes
app.use(routes);

io.sockets.on('connection', function (socket) {
  console.log('connected')
  //View
  socket.on('testOrders', async (msg) => {
    const Data = await Order.find();
    console.log(Data)
    io.emit('testOrders', Data);
  });
});



server.listen(port, () => console.log(`Example app listening on port ${port}!`))