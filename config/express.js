const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

module.exports = (app) => {
    // Setup the view engine
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(express.urlencoded({ extended: true }));

    // Setup the static files
    app.use('/static', express.static('static'));
};