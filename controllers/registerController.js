const { register, attachToken } = require('../services/authService');

const registerController = require('express').Router();;

registerController.get('/', (req, res) => {
    res.render('register', {
        title: ' - Register'
    });

});

registerController.post('/', async (req, res) => {
    try {
        const result = await register(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (error) {
        res.render('register', {
            title: 'Register',
        });
    }
});



module.exports = registerController;