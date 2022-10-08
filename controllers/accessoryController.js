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
    const cube = await getById(req.params.id);
    const accessories = await getAllAccessories();

    // const missingAccessories = [];
    // Check if accessory is already attached to the cube
    let missingAccessories = [];
    let alreadyAttached = [];

    if (cube.accessory) {
        for (let acc of cube.accessory) {
            alreadyAttached.push(acc._id.toString());
        };
    }


    for (let accessory of accessories) {
        if (!alreadyAttached.includes(accessory._id.toString())) {
            missingAccessories.push(accessory);
        }
    }

    res.render('attachAccessory', {
        title: 'Attach Accessories to cube',
        cube,
        missingAccessories
    });

});

accessoryController.post('/attach/:id', async (req, res) => {

    await addAccessoriesToCube(req.params.id, Object.values(req.body));

    res.redirect('/details/' + req.params.id);
});

module.exports = accessoryController;