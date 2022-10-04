const { createCube } = require('../services/cubeServices');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('create')
});

router.post('/', async (req, res) => {
    try {
        // console.log("req.body = ",req.body);

        const result = await createCube(req.body);

        console.log("result = ", result);
        // console.log("result = ");

        res.redirect('/details/' + result.id);
        // res.redirect('/');

    } catch (err) {
        console.log('Error = ', err);
        res.render('create', {
            title: 'Request Error',
            // error: err.message.split('\n')
        });
    }
});

module.exports = router;