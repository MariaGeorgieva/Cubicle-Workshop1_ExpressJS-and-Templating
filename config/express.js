const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');


const jwtSecret = 'MGSecret';


module.exports = (app) => {
    // Setup the view engine
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(express.urlencoded({ extended: true }));

    // Setup the static files
    app.use('/static', express.static('static'));

    //Setup cookies
    app.use(cookieParser());

    //Setup JWT
    app.use(auth(jwtSecret));

    app.use(userNav());
};