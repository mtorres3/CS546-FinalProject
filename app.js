const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const data = require("./data");
const session = require('express-session');
const configRoutes = require('./routes');
const exHandles = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exHandles({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log('All routes will be running on http://localhost:3000');
});