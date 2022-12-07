const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    // 12 hour session before you are logged out
    cookie: {maxAge: 12*60*60*1000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const {seedAll} = require('./seeds');

sequelize.sync({ force: true }).then(async() => {
    await seedAll();
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});