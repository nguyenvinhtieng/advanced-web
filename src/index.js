const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

const port = process.env.PORT || 3000;

const credentials = require('./config/credentials');
const route = require('./route/index');
const db = require('./config/db')
const initAdmin = require('./config/admin')
const handlebarsHelpers = require('./app/lib/handlebars-helpers');
const handleSocket = require('./socket/index')

app.use(methodOverride('_method'));

db.connect();
app.use(cookieParser((credentials.cookieSecret)))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
var hbs = handlebars.create({ extname: '.hbs', helpers: handlebarsHelpers });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

route(app)

initAdmin.createAdminAccount();

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})

handleSocket(io)