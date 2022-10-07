const aboutController = require('../controllers/aboutController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const accessoryController = require('../controllers/accessoryController')


module.exports = (app) => {
    app.use(catalogController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/accessory', accessoryController);


    app.all('*', (req, res) => {
        res.status(404).send('<h1>404! Page not found</h1>');
    });
}