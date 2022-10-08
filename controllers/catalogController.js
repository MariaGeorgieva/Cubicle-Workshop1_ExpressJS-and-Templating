const { getAllAccessories } = require('../services/AccService');
const { getAll, getById } = require('../services/cubeServices');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const fromDiff = req.query.from || 1;
    const toDiff = req.query.to || 6;

    const cubes = await getAll(search, fromDiff, toDiff);
    res.render('catalog', {
        cubes,
        search,
        fromDiff,
        toDiff
    })
});

router.get('/details/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId).populate('accessory');
  

    if (cube) {
        res.render('details', {
            cube,

        });

    } else {
        res.render('404');
    }
});

module.exports = router;