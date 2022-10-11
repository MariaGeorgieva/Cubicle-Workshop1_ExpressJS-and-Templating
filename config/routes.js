const aboutController = require('../controllers/aboutController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const accessoryController = require('../controllers/accessoryController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const { hasUser } = require('../middlewares/guards');


module.exports = (app) => {
    app.use(catalogController);
    app.use('/about', aboutController);
    app.use('/create', hasUser(), createController);
    app.use('/accessory', accessoryController);
    app.use('/login', loginController);
    app.use('/register', registerController);



    app.all('*', (req, res) => {
        res.status(404).send('<h1>404! Page not found</h1>');
    });
}