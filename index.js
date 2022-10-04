const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const aboutController = require('./controllers/aboutController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');

const app = express();

// Setup the view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs')

// Setup the body parser
app.use(express.urlencoded({ extended: true }));

// Setup the static files
app.use('/static', express.static('static'))

app.use(catalogController);
app.use('/about', aboutController);
app.use('/create', createController);


app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});


app.listen(3000, () => console.log('Listening on port 3000! Now its up to you...'));