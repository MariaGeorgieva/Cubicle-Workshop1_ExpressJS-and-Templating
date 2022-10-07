const { createAccessory, getAllAccessories, addAccessoriesToCube } = require('../services/AccService');
const { getById } = require('../services/cubeServices');

const accessoryController = require('express').Router();

accessoryController.get('/create', (req, res) => {
    res.render('createAccessory');

});

accessoryController.post('/create', async (req, res) => {
    try {
        await createAccessory(req.body);
        res.redirect('/');

    } catch (err) {
        res.render('createAccessory', {
            title: ' - Request Error',
            error: err.message.split('\n')
        });
    }

});

accessoryController.get('/attach/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await getById(cubeId);
    const accessories = await getAllAccessories();

    res.render('attachAccessory', {
        title: 'Attach Accessories to cube',
        cube,
        accessories
    });

});

accessoryController.post('/attach/:id', async (req, res) => {

    console.log(req.body);
    await addAccessoriesToCube(req.params.id, Object.keys(req.body));

    // res.redirect('/accessory/attach/' + req.params.id);
    res.redirect('/details/' + req.params.id);
});

module.exports = accessoryController;