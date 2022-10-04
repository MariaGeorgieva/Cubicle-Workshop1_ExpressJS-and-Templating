const { getAll, getById } = require('../services/cubeServices');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const fromDiff = req.query.from || 1;
    const toDiff = req.query.to || 6;

    console.log('search, fromDiff, toDiff', search, fromDiff, toDiff);

    const cubes = await getAll(search, fromDiff, toDiff);
    res.render('catalog', {
        cubes,
        search,
        fromDiff,
        toDiff
    })
});

router.get('/details/:id', (req, res) => {
    const cubeId = req.params.id;
    const cube = getById(cubeId)

    if (cube) {
        res.render('details', {
            cube
        });

    } else {
        res.render('404');
    }
});

module.exports = router;