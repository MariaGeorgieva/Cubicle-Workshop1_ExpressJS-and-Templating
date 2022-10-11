const { login, attachToken } = require('../services/authService');

const loginController = require('express').Router();;


loginController.get('/', (req, res) => {
    res.render('login', {
        title: ' - Login'
    });
});


loginController.post('/', async (req, res) => {
    try {
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            title: 'Login',
        });
    }
});



module.exports = loginController;